// 引入axios
import axios from '@/untils/myaxios.js'
export const userLogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
