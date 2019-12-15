<template>
    <div class="cell" @click="handlerclick">
        <div class="left">{{title}}</div>
        <div class="right">{{desc}}<span class="iconfont iconjiantou1"></span></div>
        <!-- <van-icon name="arrow" /> -->

    </div>
</template>

<script>
export default {
  props: ['title', 'desc'],
  methods: {
    handlerclick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
.cell{
    height: 60*100vw/360;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 15px;
    > .right{
        color:#aaa;
        font-size: 13px
    }
}
</style>
