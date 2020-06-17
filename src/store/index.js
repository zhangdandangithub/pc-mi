import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName:'',//登录用0
    cartCount:0//购物车商品数量
  },
  mutations: {
    MutationsGetUserName (state, val) {
      state.userName = val;
    },
    MutationsCartCount (state, val) {
      state.cartCount = val;
    }
  },
  actions: {
    ActionsGetUserName ( {commit}, val ) {
      commit("MutationsGetUserName", val);
    },
    ActionsCartCount ( {commit}, val ) {
      commit("MutationsCartCount", val);
    }
  },
  modules: {
  }
})
