import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    title: '主页',
    tableId: '0101',
    activeMenu: 'resMgr',
    selectAttrData: {}
  },
  mutations: {
    isLogin (state, data) {
      state.isLogin = data
    },
    title (state, data) {
      state.title = data
    },
    tableId (state, data) {
      state.tableId = data
    },
    activeMenu(state, data) {
      state.activeMenu = data
    },
    selectAttrData(state, data) {
      state.selectAttrData = data
    }
  }
})

export default store
