<template>
<div class="btn" @click="handlerclick">{{text}}</div>
</template>
<script>
export default {
  props: ['text'],
  methods: {
    handlerclick (event) {
      this.$emit('click', event)
    }
  }
}
</script>
<style lang='less' scoped>
    .btn {
        // vw: viewport width:视口宽度
        // vh:viewport height:视口高度
        // 不管什么屏幕，视口的宽度都会分为100份，所以在设置元素宽高的时候，可以参照UI稿件中的元素的实际大小进行大小的设置
        width:314*100vw/360;
        height: 48*100vw/360;
        background-color: rgb(204, 51, 0);
        border-radius: 24*100vw/360;
        color: #fff;
        text-align: center;
        line-height: 48*100vw/360;
        font-size: 18px;
    }
</style>
