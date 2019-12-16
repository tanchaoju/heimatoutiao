<template>
   <div class="index">
 <div class="header">
    <span class="iconfont iconnew icon"></span>
    <div class="center">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;搜索商品
    </div>
    <van-icon name="manager-o" class="icon"/>
</div>

   </div>
</template>

<style lang='less' scoped>
.index {
  .header {
    height: 50 * 100vw/360;
    display: flex;
    justify-content: space-between;
    background-color: #f00;
    align-items: center;
    color: #fff;
    .icon {
      font-size: 25px;
      padding: 0 10px;
    }
    .iconnew {
      font-size: 60px;
    }
    .center {
      flex: 1;
      height: 40px;
      line-height: 40px;
      background-color: rgba(255, 255, 255, 0.5);
      text-align: center;
      border-radius: 20px;
    }
  }
}
</style>
