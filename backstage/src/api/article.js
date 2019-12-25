// 引入axios
import axios from '@/untils/myaxios.js'
// 获取文章列表
export const postList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
// 发布文章
export const fbPost = (data) => {
  return axios({
    method: 'post',
    url: '/post',
    data
  })
}
