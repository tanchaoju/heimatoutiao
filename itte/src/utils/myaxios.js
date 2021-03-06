import axios from 'axios'
import { Toast } from 'vant'

// 配置基准路径
axios.defaults.baseURL = 'http://localhost:3000'

// 将基准路径保存到本地
localStorage.setItem('mybaseURL', axios.defaults.baseURL)

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  localStorage.setItem('mybaseURL', axios.defaults.baseURL)
  let token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response)
  if (response.data.message === '用户信息验证失败!' || response.data.message === '用户信息验证失败') {
    Toast.fail('用户信息验证失败')
    window.location.href = '#/login'
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default axios
