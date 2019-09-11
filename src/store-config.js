export default {
  state: {
    ready: window.location.hash.includes('%E2%9D%A4')
  },
  getters: {
    isReady(state) {
      return state.ready;
    }
  },
  mutations: {
    becomeReady(state) {
      if (!window.location.hash.includes('%E2%9D%A4'))
        window.location.hash += '%E2%9D%A4';
      state.ready = true;
    }
  },
  actions: {
    becomeReady({ commit }) {
      commit('becomeReady');
    }
  }
};
