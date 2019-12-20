<template>
     <div class="commentitem">
         <!-- v-if="comment.parent"判断是否有值，有值才传递，防止报错 -->
         <mycomment v-if="comment.parent" :comment='comment.parent' @replyComment="huifu"></mycomment>
        <div class="head">
          <div>
            <span>{{comment.user.nickname}}</span>
            <span>2小时前</span>
          </div>
          <span @click="huifu(comment)">回复</span>
        </div>
        <div class="text">{{comment.content}}</div>
      </div>
</template>
<script>
export default {
  // 递归组件，可以使用name属性在组件内实现递归
  name: 'mycomment',
  props: ['comment'],
  methods: {
    huifu (comment) {
      this.$emit('replyComment', comment)
    }
  }
}
</script>

<style lang='less' scoped>
.commentitem {
  border: 1px solid #ccc;
  padding: 4px;
  box-sizing: border-box;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      flex: 1;
      display: flex;
      > span {
        font-size: 12px;
        color: #999;
      }
      .cname {
        margin-right: 10px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 13px;
    color: #333;
    padding: 10px 0;
  }
}
</style>
