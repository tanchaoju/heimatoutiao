import Vue from 'vue'
import App from './App.vue'
import '@/styles/reset.css'

import router from '@/router/index.js'
import { Toast, Uploader, Dialog, Field, Picker, Icon, Tab, Tabs, List, PullRefresh, SwipeCell, Button } from 'vant'
Vue.use(Toast)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Icon)
Vue.use(Icon)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(SwipeCell)
Vue.use(Button)
Vue.use(Tab).use(Tabs)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
