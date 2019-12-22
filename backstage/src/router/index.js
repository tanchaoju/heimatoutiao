import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/view/login.vue'
import Index from '@/view/index.vue'
import Welcome from '@/view/welcome.vue'
Vue.use(VueRouter)
var router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'index',
    path: '/index',
    component: Index,
    // 默认加载指定的嵌套路由
    redirect: { name: 'welcome' },
    // 嵌套路由
    children: [{
      name: 'welcome',
      path: 'welcome',
      component: Welcome
    }]
  }]
})
export default router
