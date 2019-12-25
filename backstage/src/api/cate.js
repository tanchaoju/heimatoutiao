// 引入axios
import axios from '@/untils/myaxios.js'
export const cateList = () => {
  return axios({
    url: '/category'
  })
}
