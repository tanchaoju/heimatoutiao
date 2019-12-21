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
export const getCommentData = (id, params) => {
  return axios({
    url: `/post_comment/${id}`,
    params
  })
}

// 发布评论
export const publishComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}

// 搜索文章
export const searchArticle = (params) => {
  return axios({
    url: `/post_search`,
    params
  })
}
