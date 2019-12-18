<template>
  <div class="focus">
    <myheader title="我的关注">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="list" v-for="(item,index) in list" :key="item.id">
      <div class="box">
        <img :src="item.head_img" alt />
        <div class="center">
          <p>{{item.nickname}}</p>
          <span>2019-9-9</span>
        </div>
        <span @click="unfollow(item.id,index)">取消关注</span>
      </div>
    </div>
  </div>
</template>
<script>
import myheader from '@/components/myheader.vue'
import { followList, unFollowUser } from '@/api/user.js'
export default {
  data () {
    return {
      list: []
    }
  },
  components: {
    myheader
  },
  async mounted () {
    //   获取关注列表数据
    let res = await followList()
    if (res.status === 200) {
      this.list = res.data.data
      this.list.map(value => {
        //   给图片地址添加基地址
        value.head_img = localStorage.getItem('mybaseURL') + value.head_img
      })
    }
  },
  methods: {
    //   取消关注
    async unfollow (id, index) {
      let res = await unFollowUser(id)
      if (res.status === 200) {
        //   通过删除数组的数据进行页面刷新
        this.list.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
 .list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
     img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
     .center {
      flex: 1;
      p {
        line-height: 30px;
        font-size: 14px;
      }
       span {
        font-size: 12px;
        color: #999;
      }
    }
     span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>
