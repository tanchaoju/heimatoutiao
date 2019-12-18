<template>
  <div class="collect">
    <myheader title="我的收藏">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="list">
      <van-swipe-cell v-for="(item,index) in list" :key="item.id">
        <articleblock :post="item"></articleblock>
        <template slot="right">
          <van-button square type="danger" text="删除" @click="del(item.id,index)" />
          <!-- <van-button square type="danger" text="删除" /> -->
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>
<script>
import myheader from '@/components/myheader.vue'
import articleblock from '@/components/articleBlock.vue'
import { collectList, collectArticle } from '@/api/user.js'
export default {
  data () {
    return {
      list: []
    }
  },
  components: {
    myheader,
    articleblock
  },
  async mounted () {
    //   获取收藏列表数据
    let res = await collectList()
    console.log(res)
    if (res.status === 200) {
      this.list = res.data.data
    }
  },
  methods: {
    async del (id, index) {
      // 在收藏数据列表删除该文章，并取消收藏
    //   取消收藏
      let res = await collectArticle(id)
      //   删除数据
      this.$toast.success(res.data.message)
      this.list.splice(index, 1)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.van-swipe-cell__right{
    display:flex;
    justify-content:centet;
    align-items:center
}
</style>
