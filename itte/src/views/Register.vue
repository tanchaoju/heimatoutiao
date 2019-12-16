<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <hminput
          placeholder="请输入用户名/手机号"
          v-model="user.username"
          :rules="/^1\d{10}$/"
          msg_err="手机号输入不合法，请输入11位手机号"
        ></hminput>
        <hminput type="password" v-model="user.password" placeholder="请输入密码"></hminput>
        <hminput placeholder="请输入昵称" v-model="user.nickname"></hminput>
      </div>
      <p class="tips">
        已有账号？
        <a href="#/login" class>去登录</a>
      </p>
      <hmbutton text="注册" @click="register"></hmbutton>
    </div>
  </div>
</template>
<script>
import hmbutton from '@/components/button.vue'
import hminput from '@/components/input.vue'
import { userRegister } from '@/api/user.js'
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  components: {
    hmbutton,
    hminput
  },
  methods: {
    async register () {
      let res = await userRegister(this.user)
      if (res.data.message === '注册成功') {
        this.$toast.success('注册成功')
        this.$router.push({ name: 'login' })
      } else {
        this.$toast.fail(res.data.message)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  padding: 20px;
  height: 100vh;
  background-color: rgb(242, 242, 242);
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
