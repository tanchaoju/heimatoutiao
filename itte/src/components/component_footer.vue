<template>
  <div class="comment">
    <div class="addcomment" v-show='!isFocus'>
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span v-if="ishow" class="comment"  @click="$router.push({path: `/comments/${article.id}`})">
        <i class="iconfont iconpinglun-"></i>
        <em>{{article.comment_length}}</em>
      </span>
      <i v-if="ishow" class="iconfont iconshoucang" @click="collect" :class='{active:article.has_star}'></i>
      <i v-if="ishow" class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show='isFocus'>
        <textarea  ref='commtext' rows="5" :placeholder="placeholder" ></textarea>
        <div>
            <span @click="releaseCommnet">发送</span>
            <span @click='cancelReplay'>取消</span>
        </div>
    </div>
  </div>
</template>

<script>
import { collectArticle } from '../api/user.js'
import { publishComment } from '../api/article.js'

export default {
  props: ['article', 'reply', 'ishow'],
  data () {
    return {
      isFocus: false,
      placeholder: ''
    }
  },
  methods: {
    //   获取焦点时触发
    handlerFocus () {
      this.isFocus = !this.isFocus
      setTimeout(() => {
        this.$refs.commtext.focus()
      }, 1)
    },
    // 收藏文章
    async collect () {
      let res = await collectArticle(this.article.id)
      this.$toast.success(res.data.message)
      this.article.has_star = !this.article.has_star
    },
    cancelReplay () {
      this.isFocus = false
      // 在子组件无法重置reply，所以告诉父组件要重置
      this.$emit('resetValue')
    },
    // 发布评论
    async  releaseCommnet () {
      // 获取文本域内容
      let data = { content: this.$refs.commtext.value }
      // 判断是否是第一个评论
      if (this.reply) {
        data.parent_id = this.reply.id
      }
      let res = await publishComment(this.article.id, data)
      if (res.data.message === '评论发布成功') {
        this.$toast.success(res.data.message)
        this.$refs.commtext.value = ''
        this.isFocus = false
        // 通知父组件进行数据的刷新
        this.$emit('refresh')
      }
    }
  },
  watch: {
    // 监听reply，当reply有数据时，则代表父组件触发了点击事件，并传递了数据。此时通过改变isFocus的值来触发弹窗
    reply () {
      if (this.reply) {
        console.log(this.reply)
        this.isFocus = true
        setTimeout(() => {
          this.$refs.commtext.focus()
        }, 1)
        this.placeholder = '@' + this.reply.user.nickname
      }
    }
  }
}
</script>

<style lang='less' scoped>
div.comment{
    position: fixed;
    bottom: 0;
    left: 0;
    margin-bottom: 10px;
}
.active{color:red;}
.inputcomment{
    padding: 10px;
    box-sizing: border-box;
    width: 100vw;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    textarea{
        flex: 3;
        background-color: #eee;
        border:none;
        border-radius: 10px;
        padding: 10px;
    }
    div{
        padding: 20px;
    }
    span {
        display: block;
        flex: 1;
        height: 24px;
        line-height: 24px;
        margin-top: 10px;
        padding: 0 10px;
        background-color: #f00;
        color:#fff;
        text-align: center;
        border-radius: 6px;
        font-size: 13px;
    }
}
.addcomment {
  background-color: #fff;
  width: 100vw;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>
