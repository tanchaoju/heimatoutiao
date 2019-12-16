<template>
  <div class="personal">
    <router-link :to="'/editPersonal/'+currentUser.id">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{currentUser.nickname}}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <mycell title="我的关注" desc="关注的用户"></mycell>
    <mycell title="我的跟帖" desc="跟帖/回复"></mycell>
    <mycell title="我的收藏" desc="文章/视频"></mycell>
    <mycell title="设置" desc=''></mycell>
    <hmbutton text="退出" @click="exitApp"></hmbutton>
  </div>
</template>

<script>
import mycell from '@/components/mycell.vue'
import hmbutton from '@/components/button.vue'
import { getUserInfo } from '@/api/user.js'

export default {
  data () {
    return {
      currentUser: {}
    }
  },
  components: {
    mycell,
    hmbutton
  },
  async mounted () {
    this.id = this.$route.params.id
    let res = await getUserInfo(this.id)
    console.log(res)
    if (res.data.message === '获取成功') {
      this.currentUser = res.data.data
      if (res.data.data.head_img) {
        this.currentUser.head_img = localStorage.getItem('mybaseURL') + this.currentUser.head_img
      } else {
        this.currentUser.head_img = localStorage.getItem('mybaseURL') + '/uploads/image/moren.jpg'
      }
    } else {
      this.$toast.fail('获取数据失败')
    }
  },
  methods: {
    exitApp () {
      localStorage.removeItem('token')
      localStorage.removeItem('mybaseURL')
      this.$router.push({ name: 'Index' })
    }
  }
}
</script>

<style lang='less' scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.btn{
  margin: 30px auto;
}
</style>
