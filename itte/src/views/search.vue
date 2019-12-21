<template>
  <div class="search">
    <div class="header">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search v-model="keyword" placeholder="请输入搜索关键词" shape="round" @search="onSearch"></van-search>
      <span @click="search(keyword)">搜索</span>
    </div>
    <div class="searchList">
      <h2>历史记录</h2>
      <p v-for="(item,index) in searchHistory" :key="index" @click="search(item)">{{item}}</p>
    </div>
    <div class="searchResult">
      <h2>搜索结果</h2>
      <p v-for="item in resultList" :key='item.id' @click="$router.push({path:`/articleDetail/${item.id}`})">{{item.title}}</p>
    </div>
  </div>
</template>
<script>
import { searchArticle } from '@/api/article.js'
export default {
  data () {
    return {
      keyword: '',
      resultList: '',
      searchHistory: []
    }
  },
  mounted () {
    // 获取历史搜索本地存储
    this.searchHistory = JSON.parse(localStorage.getItem('searchStrong') || '[]')
  },
  methods: {
    async onSearch (keyword) {
      // 判断是否有输入关键字
      if (keyword.trim() === '') {
        this.$toast.fail('请输入关键字')
        return
      }
      //   调用api方法根据关键字搜索文章
      let res = await searchArticle({ keyword: keyword })
      this.resultList = res.data.data
      //   获取搜索关键字本地存储
      let arr = JSON.parse(localStorage.getItem('searchStrong') || '[]')
      //   将关键字加入本地存储
      // 判断本地存储中是否已经有该关键字,有则先删后加
      let index = arr.indexOf(keyword)
      if (index !== -1) {
        arr.splice(index, 1)
      }
      //  如果超出了指定的记录数量，那么应该删除最先存储的记录，再添加
      if (arr.length >= 10) {
        arr.splice(arr.length - 1, 1)
      }
      arr.unshift(keyword)
      //   存入本地存储
      localStorage.setItem('searchStrong', JSON.stringify(arr))
    },
    async search (item) {
      if (item.trim() === '') {
        this.$toast('请输入关键字')
        return
      }
      let res = await searchArticle({ keyword: item || this.keyword })
      if (res.status === 200) {
        this.resultList = res.data.data
        let arrStr = localStorage.getItem('searchStrong') || '[]'
        let arr = JSON.parse(arrStr)
        let index = arr.indexOf(item)
        if (index !== -1) {
          arr.splice(index, 1)
        }
        if (arr.length >= 10) {
          arr.splice(arr.length - 1, 1)
        }
        arr.unshift(item)
        localStorage.setItem('searchStrong', JSON.stringify(arr))
      }
    }
  }
}
</script>

<style lang='less' scoped>
.setLine(@num){
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: @num;
    overflow: hidden;
    text-overflow: ellipsis;
}
.header {
  height: 54 * 100vw/360;
  display: flex;
  align-items: center;
  background-color: #eee;
  border-bottom: 1px solid #bbb;
  .van-search {
    flex: 1;
    height: 54 * 100vw/360;
    background-color: #eee !important;
  }
  > span {
    padding: 0 10px;
  }
}
.searchList,
.searchResult {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  p {
    line-height: 30px;
    text-decoration: underline;
    .setLine(1);
  }
}
</style>
