// 这个文件主要用于处理与新闻相关的业务
// 1.引入axios
import axios from '@/utils/myaxios.js'

export const getArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
