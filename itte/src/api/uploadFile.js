// 此文件用来处理文件上传
import axios from '@/utils/myaxios.js'

export const uploadFile = (data) => {
  return axios({
    method: 'post',
    url: '/upload',
    data
  })
}
