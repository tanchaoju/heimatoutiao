<template>
  <div class="postlist">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="postlist" border style="width: 100%;margin-top:20px">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" width="400"></el-table-column>
      <el-table-column prop="create_date" label="日期" width="180">
          <template slot-scope="scope">{{scope.row.create_date|dataFormat}}</template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="180">
        <template slot-scope="scope">{{scope.row.type===1?'文章':'视频'}}</template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-edit"
              @click="handleDelete(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分享" placement="top-start">
            <el-button size="mini" type="primary" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top:20px">
    </el-pagination>
  </div>
</template>

<script>
import { postList } from '@/api/article.js'
export default {
  data () {
    return {
      pageIndex: 1,
      pageSize: 2,
      total: 0,
      postlist: []
    }
  },
  filters: {
    dataFormat: (data, spe) => {
      data = new Date(data)
      spe = spe || '/'
      var nn = data.getFullYear()
      var mm = data.getMonth() + 1
      var dd = data.getDate()
      return nn + spe + mm + spe + dd
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      let res = await postList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      this.postlist = res.data.data
      // 获取总记录数，方便后期的分页属性的设置
      this.total = res.data.total
      console.log(this.postlist, this.pageIndex, this.pageSize, res)
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      console.log(val)
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(val)
      this.pageIndex = val
      this.init()
    }
  }
}
</script>
