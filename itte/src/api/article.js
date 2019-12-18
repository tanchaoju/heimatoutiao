// 这个文件主要用于处理与新闻相关的业务
// 1.引入axios
import axios from '@/utils/myaxios.js'

export const getArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 获取文章详情数据
export const getArticleDetail = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 获取当前文章评论数据ArticleDetail
export const getCommentData = (id) => {
  return axios({
    url: `/post_comment/${id}`
  })
}
