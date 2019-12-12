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
        <!-- <hminput
        placeholder='请输入用户名/手机号'
        :value='users.username'
        @input='hanlderinput'
        ></hminput> -->
        <!-- <hminput
        placeholder='请输入用户名/手机号'
        v-model='users.username'
        :rules='/^1\d{10}$/'
        msg_err='手机号输入不合法，请输入11位手机号'
        ></hminput>
        <hminput type='password' v-model="users.password"></hminput> -->
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <hmbutton text='登陆' @click='login'></hmbutton>
    </div>
  </div>
</template>

<script>
import hmbutton from '@/components/button.vue'
export default {
  components: {
    hmbutton
  },
  methods: {
    login () {
      console.log('1111')
    }
  }
}
</script>

<style lang='less'>
.container {
  padding: 20px;
  height: 100vh;
  background-color: rgb(242,242,242);
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
