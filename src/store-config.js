export default {
  state: {
    ready: location.hash.includes('%E2%99%A5')
  },
  getters: {
    isReady(state) {
      return state.ready;
    }
  },
  mutations: {
    becomeReady(state) {
      if (!location.hash.includes('%E2%99%A5'))
        location.hash += '%E2%99%A5';
      state.ready = true;
    }
  },
  actions: {
    becomeReady({ commit }) {
      commit('becomeReady');
    }
  }
};
