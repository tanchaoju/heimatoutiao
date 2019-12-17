// 这个文件主要用来处理与栏目分类相关的业务
// 1.引入axios
import axios from '@/utils/myaxios.js'

// 获取栏目数据
export const getCateList = () => {
  return axios({
    url: '/category'
  })
}
