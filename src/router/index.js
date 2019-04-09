import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import routers from './routers'




export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routers,
  // 判断是否需要登录权限 以及是否登录
  beforeEach: ((to, from, next) => {
    //这里判断用户是否登录，验证本地存储是否有token
    if (sessionStorage.token && sessionStorage.token != null) { // 判断当前的token是否存在
      next()
    } else {
      if (to.path == '/login') { //如果是登录页面路径，就直接next()
        next()
      } else { //不然就跳转到登录；
        next('/login')
      }
    }
  })
})