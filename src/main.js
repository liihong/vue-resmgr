import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import ajax from './utils/ajax'
import api from './api/api'
import util from './utils/util'
import './assets/css/theme/index.css'
import message from './utils/message'
import elementUI from 'element-ui'

Vue.use(elementUI)

Vue.config.productionTip = false

Vue.prototype.$ajax = ajax
Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.prototype.$util = util
Vue.prototype.$message = message
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')