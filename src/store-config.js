export default {
  state: {
    ready: window.location.hash.includes('ready')
  },
  getters: {
    isReady(state) {
      return state.ready;
    }
  },
  mutations: {
    becomeReady(state) {
      state.ready = true;
    }
  },
  actions: {
    becomeReady({ commit }, delay) {
      setTimeout(() => { commit('becomeReady') }, delay);
    }
  }
};
