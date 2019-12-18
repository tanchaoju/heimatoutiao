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

// 用户户注册
export const userRegister = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

// 关注用户
export const followUser = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}
// 取消关注
export const unFollowUser = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}

// 点赞文章
export const likeArticle = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}

// 收藏文章
export const collectArticle = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}
// 用户关注列表
export const followList = (id) => {
  return axios({
    url: `/user_follows`
  })
}
// 用户收藏列表
export const collectList = (id) => {
  return axios({
    url: `/user_star`
  })
}
