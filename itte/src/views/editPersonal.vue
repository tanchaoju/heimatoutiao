<template>
  <div class="editPersonal">
    <myheader title="编辑个人信息">
      <!-- @click="$router.back()跳转回上一个页面 -->
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </myheader>
    <div class="head">
      <img alt :src="current.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 修改昵称 -->
    <mycell title="昵称" :desc="current.nickname" @click="nickshow=!nickshow"></mycell>
    <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="updateNickname">
      <van-field required :value="current.nickname" label="昵称" placeholder="请输入昵称" ref="nickname" />
    </van-dialog>
    <!-- 修改密码 -->
    <mycell title="密码" desc="******" @click="pwdshow=!pwdshow"></mycell>
    <van-dialog v-model="pwdshow" title="修改密码" show-cancel-button @confirm="updatePassword" :before-close='beforeClose'>
      <van-field required label="旧密码" placeholder="请输入旧密码" ref="oldpwd" />
      <van-field required label="新密码" placeholder="请输入新密码" ref="newpwd" />
    </van-dialog>
    <!-- 修改性别 -->
    <mycell title="性别" :desc="current.gender===1?'男':'女'" @click="gendershow=!gendershow"></mycell>
    <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm="updateGender">
      <van-picker :columns=" ['女', '男']" :default-index="current.gender" @change="onChange" />
    </van-dialog>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import mycell from '@/components/mycell.vue'
import { uploadFile } from '@/api/uploadFile.js'
import { getUserInfo, editUser } from '@/api/user.js'

export default {
  data () {
    return {
      id: '',
      current: {},
      nickshow: false,
      pwdshow: false,
      gendershow: false,
      genderIndex: ''
    }
  },
  components: {
    myheader,
    mycell
  },
  async mounted () {
    this.id = this.$route.params.id
    let res = await getUserInfo(this.id)
    if (res.data.message === '获取成功') {
      this.current = res.data.data
      if (res.data.data.head_img) {
        this.current.head_img =
          localStorage.getItem('mybaseURL') + this.current.head_img
      } else {
        this.current.head_img =
          localStorage.getItem('mybaseURL') + '/uploads/image/moren.jpg'
      }
    } else {
      this.$toast.fail('获取数据失败')
    }
  },
  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      //   file.file是文件资源数据，使用formdata包装数据
      let formdata = new FormData()
      formdata.append('file', file.file)
      uploadFile(formdata)
        .then(async res => {
          console.log(res)
          if (res.data.message === '文件上传成功') {
            //   用户头像更新
            let res1 = await editUser(this.id, { head_img: res.data.data.url })
            if (res1.data.message === '修改成功') {
              this.$toast.success('用户头像修改成功')
              this.current.head_img =
                localStorage.getItem('mybaseURL') + res.data.data.url
            } else {
              this.$toast.fail('用户头像修改失败')
            }
          } else {
            this.$toast.fail('文件上传失败')
          }
        })
        .catch(err => {
          console.log('1111')
          console.log(err)
        })
    },
    async updateNickname () {
      // 通过this.$refs.nickname.$refs.input.value获取修改的昵称名
      // console.log(this.$refs.nickname.$refs.input.value)
      let nickname = this.$refs.nickname.$refs.input.value
      let res = await editUser(this.id, { nickname })
      // console.log(res)
      if (res.data.message === '修改成功') {
        this.$toast.success('修改昵称成功')
        this.current.nickname = nickname
      } else {
        this.$toast.fail('修改昵称失败')
      }
    },
    async updatePassword () {
      let oldpwd = this.$refs.oldpwd.$refs.input.value
      // 判断原密码是否正确
      if (this.current.password === oldpwd) {
        let password = this.$refs.newpwd.$refs.input.value
        if (!/\w{3,16}/.test(password)) {
          this.$toast.fail('请重新输入3~16位的新密码')
          return
        }
        // 调用API方法更改密码
        let res = await editUser(this.id, { password })
        if (res.data.message === '修改成功') {
          this.$toast.success('密码修改成功 ')
          localStorage.removeItem('mybaseURL')
          localStorage.removeItem('token')
          this.$router.push({ name: 'login' })
        } else {
          this.$toast.fail('密码修改失败 ')
        }
      }
    },
    // 当原密码输入错误是不应该直接关闭模态框
    // action是当前操作的类型：confirm   cancel
    // done():可以关闭当前模态框
    // done(false):不关闭当前模态框
    beforeClose (action, done) {
      let oldpwd = this.$refs.oldpwd.$refs.input.value
      let password = this.$refs.newpwd.$refs.input.value
      if (action === 'confirm' && this.current.password !== oldpwd) {
        this.$toast.fail('原始密码输入错误')
        done(false)
      } else if (action === 'confirm' && !/\w{3,16}/.test(password)) {
        this.$toast.fail('请重新输入3~16位的新密码 ')
        done(false)
      } else {
        done()
      }
    },
    async updateGender () {
      // console.log(this.genderIndex)
      if (this.genderIndex === '') {
        this.genderIndex = this.current.gender
      }
      let res = await editUser(this.id, { gender: this.genderIndex })
      console.log(res)
      if (res.data.message === '修改成功') {
        this.$toast.success('性别修改成功')
        this.current.gender = this.genderIndex
      } else {
        this.$toast.fail('修改失败')
      }
    },
    onChange (picker, value, index) {
      // value代表切换的值
      // index代表切换的值的索引值
      // console.log(picker, value, index)
      this.genderIndex = index
    }
  }
}
</script>

<style lang='less' scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;

  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
  // 修改元素的大小
  /deep/.van-uploader__upload {
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
