import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      carbonCount: 0
    }
  },
  getters: {
  },
  mutations: {
    change (state,num) {
      // @ts-ignore
      state.carbonCount += num
    },
    set (state,num) {
      // @ts-ignore
      state.carbonCount = num
    }
  },
  actions: {
  },
  modules: {
  }
})
