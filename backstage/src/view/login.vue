<template>
  <div class="login">
    <div class="container">
      <img src="../assets/qyc.jpg" alt class="avatar" />
      <el-form ref="loginform" :model="loginform"  :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="loginform.username" placeholder="请输入用户名" prefix-icon="icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginform.password"
            placeholder="请输入密码"
            show-password
            prefix-icon="icon-key"
            @keydown.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { userLogin } from '@/api/user.js'
export default {
  data () {
    return {
      loginform: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6~16位的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginform.validate(async valid => {
        if (valid) {
          // 调用api方法验证登录
          let res = await userLogin(this.loginform)
          if (res.data.message === '登录成功') {
            // 调用element  Message 消息提示模块进行提示
            this.$message.success(res.data.message)
            localStorage.setItem('backstage_token', res.data.data.token)
            this.$router.push({ name: 'index' })
          } else {
            this.$message.error(res.data.message)
          }
        } else {
          console.log('输入不合法')
          return false
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
