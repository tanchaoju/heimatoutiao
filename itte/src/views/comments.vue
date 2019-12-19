<template>
  <div class="comments">
    <myheader title="精彩跟帖">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="commentList" v-for='comment in commentArr' :key="comment.id">
      <div class="item">
        <div class="head">
          <img :src="comment.user.head_img" alt />
          <div>
            <span>{{comment.user.nickname}}</span>
            <span>2小时前</span>
          </div>
          <span @click="replyComment(comment)">回复</span>
        </div>
         <!-- v-if="item.parent"判断是否有值，有值才传递，防止报错 -->
        <commentItem v-if="comment.parent" :comment='comment.parent'></commentItem>
        <div class="text">{{comment.content}}</div>
      </div>
    </div>
    <!-- y引入底部评论框部分 -->
    <componentFooter :article="article" :reply="parentReply"></componentFooter>
  </div>
</template>
<script>
import componentFooter from '@/components/component_footer.vue'
import myheader from '@/components/myheader.vue'
import commentItem from '@/components/commentitem.vue'
import { getCommentData, getArticleDetail } from '@/api/article.js'
export default {
  data () {
    return {
      commentArr: [],
      article: {},
      parentReply: {}
    }
  },
  components: {
    myheader, commentItem, componentFooter
  },
  async mounted () {
    // 获取文章id
    let id = this.$route.params.id
    // 获取文章详情数据
    let res1 = await getArticleDetail(id)
    this.article = res1.data.data
    // 获取评论数据
    let res = await getCommentData(id)
    console.log(res)
    if (res.status === 200) {
      this.commentArr = res.data.data.map(value => {
        value.user.head_img = localStorage.getItem('mybaseURL') + value.user.head_img
        return value
      })
    }
  },
  methods: {
    //   点击时将comment传递给子组件component_footer
    replyComment (comment) {
      this.parentReply = comment
    }
  }
}
</script>
<style lang='less' scoped>
.commentList {
//   border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
