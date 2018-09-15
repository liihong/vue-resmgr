import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import './assets/css/reset.css'
import './assets/css/theme.less'
import ajax from './utils/ajax'
import api from './api/api'

Vue.config.productionTip = false

Vue.prototype.$ajax = ajax
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
