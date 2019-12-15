import Vue from 'vue'
import App from './App.vue'
import '@/styles/reset.css'

import router from '@/router/index.js'
import { Toast, Uploader, Dialog, Field, Picker } from 'vant'
Vue.use(Toast)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Picker)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
