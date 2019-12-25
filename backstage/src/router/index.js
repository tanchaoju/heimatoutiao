import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/view/login.vue'
import Index from '@/view/index.vue'
import Welcome from '@/view/welcome.vue'
import Postlist from '@/view/postlist.vue'
import PostPublish from '@/view/postPublish.vue'

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
    },
    {
      name: 'postlist',
      path: 'postlist',
      component: Postlist
    },
    {
      name: 'postPublish',
      path: 'postPublish',
      component: PostPublish
    }
    ]
  }]
})
export default router
// 添加导航守卫
router.beforeEach((to, from, next) => {
// 判断跳转的页面是否需要验证，除了登录页外其他都需要验证
  if (to.path === '/login') {
    next()
  } else {
    // 判断是否有token值
    let token = localStorage.getItem('backstage_token')
    if (token) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
