// 引入vue和vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Personal from '@/views/personal.vue'
import EditPersonal from '@/views/editPersonal.vue'
import Register from '@/views/Register.vue'
import Index from '@/views/index.vue'
import ArticleDetail from '@/views/articleDetail.vue'
import Myfollow from '@/views/myfollow.vue'
import Mycollect from '@/views/mycollect.vue'
import Comments from '@/views/comments.vue'

// 使用use挂载
Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'personal',
      path: '/personal/:id',
      component: Personal
    },
    {
      name: 'editPersonal',
      path: '/editPersonal/:id',
      component: EditPersonal
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'index',
      path: '/',
      component: Index
    },
    {
      name: 'articleDetail',
      path: '/articleDetail/:id',
      component: ArticleDetail
    },
    {
      name: 'myfollow',
      path: '/myfollow',
      component: Myfollow
    },
    {
      name: 'mycollect',
      path: '/mycollect',
      component: Mycollect
    },
    {
      name: 'comments',
      path: '/comments/:id',
      component: Comments
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/personal/') === 0) {
    let token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
