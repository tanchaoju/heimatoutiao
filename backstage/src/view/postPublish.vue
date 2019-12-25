<template>
  <div class="postPublish">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加卡片视图 -->
    <el-card class="box-card" style="margin-top:20px">
      <!-- 添加表单 -->
      <el-form ref="form" :model="postForm" label-width="80px">
        <!-- 标题 -->
        <el-form-item label="标题：">
          <el-input v-model="postForm.title"></el-input>
        </el-form-item>
        <!-- 类型 -->
        <el-form-item label="类型：">
          <el-radio-group v-model="postForm.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 富文本框 -->
        <el-form-item label="内容：">
            <!-- 编辑文章则显示富文本框 -->
          <VueEditor :config="config"  v-if="postForm.type===1" ref="postContent"/>
            <!-- 编辑视频则上传文件按钮
            组件设置:headers="setToken()"请求头属性 -->
          <el-upload
          v-if="postForm.type===2"
            class="upload-demo"
            action="http://localhost:3000/upload"
            :headers="setToken()"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-success="successUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
          </el-upload>
        </el-form-item>
        <!-- 栏目 -->
        <el-form-item label="栏目：">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCate" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="item in cateList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 封面 -->
        <el-form-item label="封面：">
          <el-upload
            action="http://127.0.0.1:3000/upload"
            list-type="picture-card"
            :headers="setToken()"
            :on-success="coverSuccessUpload"
            :on-remove="coverRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publishPost">发布文章</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
import { cateList } from '@/api/cate.js'
import { fbPost } from '../api/article.js'
export default {
  data () {
    return {
      checkAll: false,
      checkedCate: [],
      cateList: [],
      isIndeterminate: true,
      fileList: [],
      postForm: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          // 添加请求头对token的设置
          headers: this.setToken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        },
        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          // 添加请求头对token的设置
          headers: this.setToken(),
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        }
      }
    }
  },
  components: {
    VueEditor
  },
  async mounted () {
    let res = await cateList()
    this.cateList = res.data.data.splice(1)
  },
  methods: {
    //   上传视频，上传前判断是否为视频文件
    beforeUpload (file) {
      console.log(file)
      if (file.type.indexOf('video/') !== 0) {
        this.$message.warning('请选择视频文件')
      }
    },
    // 视频上传成功将视频路径赋值给content
    successUpload (response) {
      if (response.message === '文件上传成功') {
        this.postForm.content = response.data.url
      }
    },
    // 获取token值
    setToken () {
      let token = localStorage.getItem('backstage_token')
      return { Authorization: token }
    },
    // 上传封面
    coverSuccessUpload (response) {
      if (response.message === '文件上传成功') {
        //   封面需上传的数据是：封面图片ID集合
        this.postForm.cover.push({ id: response.data.id })
      }
    },
    // 移除图片时，需要将数据从postForm.cover属性中删除
    coverRemove (file, fileList) {
      for (let i = 0; i < this.postForm.cover.length; i++) {
        if (this.postForm.cover[i].id === file.response.data.id) {
          this.postForm.cover.splice(i, 1)
        }
      }
    },
    //   全选
    handleCheckAllChange (val) {
      // val为true则为全选
    //   全选时将cateList的id值全部加到checkedCate
      this.checkedCate = val ? this.cateList.map(value => {
        return value.id
      }) : []
      this.isIndeterminate = false
    },
    // 单选
    handleCheckedCitiesChange (value) {
    //   value代表选中栏目的id的集合
      let checkedCount = value.length
      //   checkAll的值为true时则代表全选
      this.checkAll = checkedCount === this.cateList.length
      // 如果有选择，但是又没有全选，那么就是不确定的状态
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cateList.length
    },
    async publishPost () {
      // 1.获取文章内容
      // 1.1获取富文本内容
      if (this.postForm.type === 1) {
        this.postForm.content = this.$refs.postContent.editor.root.innerHTML
        console.log(this.postForm)
      }
      //   获取栏目数据
      //   将数据重置
      this.postForm.categories.length = 0
      this.checkedCate.forEach(value => {
        this.postForm.categories.push(value)
      })
      let res = await fbPost(this.postForm)
      console.log(res)
      if (res.data.message === '文章发布成功') {
        this.$message.success(res.data.message)
        this.$router.push({ name: 'postlist' })
      }
    }
  }
}
</script>
