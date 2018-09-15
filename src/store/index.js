import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    title: '主页'
  },
  mutations: {
    isLogin: function (state, data) {
      state.isLogin = data
    },
    title: function (state, data) {
      state.title = data
    }
  }
})

export default store
