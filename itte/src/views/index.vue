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
        <!-- :immediate-check  List 初始化后会触发一次 load 事件，用于加载第一屏的数据 -->
        <!-- 我们在钩子函数中设置了默认获取第一屏数据，所以会多加载一屏数据，通过:immediate-check='false'来关闭list的自动触发load -->
        <van-list :immediate-check='false' :offset='10' v-model="cate.loading" :finished="cate.finished" finished-text="没有更多了" @load="onLoad">
          <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
          <articleblock v-for="post in cate.postList" :key="post.id" :post="post"></articleblock>
          </van-pull-refresh>
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
          finished: false,
          isLoading: false
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
      // loading = true表示正在加载，当前加载未完成，不会进行下一步操作，等加载完成才可以进行下一步操作
      this.cateList[this.active].loading = false
      // 重置isLoading,让下拉刷新的提示消失
      this.cateList[this.active].isLoading = false
      // 判断数据是否传输完成
      if (res.data.data.length < this.cateList[this.active].pageSize) {
        // finished = true 代表全部加载完成
        this.cateList[this.active].finished = true
      }
    },
    onLoad () {
      // 上拉加载
      this.cateList[this.active].pageIndex++
      this.getPostList()
    },
    onRefresh () {
      // 重新加载第一页的数据
      this.cateList[this.active].pageIndex = 1
      // 将finished重置为False，让这个栏目可以重新的上拉加载更多数据
      this.cateList[this.active].finished = false
      // 清除数组的所有数据，可以避免反复的创建新的数组
      this.cateList[this.active].postList.length = 0
      this.getPostList()
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
