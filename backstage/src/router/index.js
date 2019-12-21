import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/view/login.vue'

Vue.use(VueRouter)
var router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  }]
})
export default router
