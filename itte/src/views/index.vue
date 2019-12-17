<template>
  <div class="index">
    <div class="header">
      <span class="iconfont iconnew icon"></span>
      <div class="center">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;搜索商品
      </div>
      <van-icon name="manager-o" class="icon" @click="jump" />
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <!-- 上拉加载 -->
        <van-list v-model="cate.loading" :finished="cate.finished" finished-text="没有更多了" @load="onLoad">
          <articleblock v-for="post in cate.postList" :key="post.id" :post="post"></articleblock>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { getCateList } from '@/api/cate.js'
import { getArticleList } from '@/api/article.js'
import articleblock from '../views/articleBlock.vue'
export default {
  data () {
    return {
      active: localStorage.getItem('token') ? 1 : 0,
      cateList: []
    }
  },
  components: {
    articleblock
  },
  async mounted () {
    let res = await getCateList()
    console.log(res)
    if (res.status === 200) {
      this.cateList = res.data.data
      // 根据获取新闻数据的参数对数据进行改造 localhost:3000/post?pageIndex=1&pageSize=2&category=8
      this.cateList = this.cateList.map(value => {
        return {
          ...value,
          pageIndex: 1,
          pageSize: 5,
          postList: [], // 栏目新闻数据
          loading: false,
          finished: false
        }
      })
    }
    // 获取默认栏目的新闻数据
    this.getPostList()
  },
  methods: {
    async getPostList () {
      let res = await getArticleList({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: this.cateList[this.active].id
      })
      // 将新闻数据存储到当前栏目的postList中，每一个栏目有一个单独的文章列表数组
      // 数据应该是追加而不是覆盖
      // this.cateList[this.active].postList = res.data.data
      this.cateList[this.active].postList.push(...res.data.data)
      // 获取数据后。将loading重置为false
      this.cateList[this.active].loading = false
      // 判断数据是否传输完成
      if (res.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
    },
    onLoad () {
      // 上拉加载
      this.cateList[this.active].pageIndex++
    },
    jump () {
      this.$router.push({
        path: `Personal/${window.localStorage.getItem('myId')}`
      })
    }
  },
  watch: {
    active () {
      if (this.cateList[this.active].postList.length === 0) {
        this.getPostList()
      }
    }
  }
}
</script>

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
