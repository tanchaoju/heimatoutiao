// 引入axios
import axios from '@/untils/myaxios.js'
export const postList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
