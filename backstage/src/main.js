// 引入vue
import Vue from 'vue'
// 引入重置样式
import '@/styles/index.less'
// 引入element-ui框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// 引入路由
import router from '@/router/index.js'

// 挂载element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
