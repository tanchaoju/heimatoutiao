import axios from '@/utils/myaxios.js'

export const userLogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

// 获取用户详情
export const getUserInfo = (id) => {
  return axios({
    url: `/user/${id}`
  })
}

// 编辑用户信息
export const editUser = (id, data) => {
  return axios({
    url: `/user_update/${id}`,
    method: 'post',
    data
  })
}
