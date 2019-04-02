import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '主页',
      component: Home,
      children:[
        {
          path: '/resMgr',
          name: '资源管理',
          component: () => import('../views/resConfig')
        },
        {
          path: '/resDisplay',
          name: '资源呈现',
          component: () => import('../views/resMgr/ResList.vue')
        },
        {
          path: '/resRelation',
          name: '资源关系',
          component: () => import('../views/resConfig/ResConfigList.vue')
        },
        {
          path: '/resConfig',
          name: '系统设置',
          component: () => import('../views/resConfig/ResConfigList.vue')
        },
        {
          path: '/resConfigList',
          name: '资源字段列表',
          hidden: true,
          component:  () => import('../views/resConfig/ResConfigList.vue')
        },
        {
          path: '/resEdit',
          name: '资源修改',
          hidden: true,
          component:  () => import('../views/resMgr/ResEdit.vue')
        }
      ]
    }
  ]
})
