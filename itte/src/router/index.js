// 引入vue和vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Personal from '@/views/personal.vue'
import EditPersonal from '@/views/editPersonal.vue'

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
