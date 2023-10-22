// @ts-nocheck
const state = {
  token: localStorage.getItem('token') || '',
};
const getters = {
  getToken(state) {
    return state.token;
  },
  isLoggedIn(state) {
    return !!state.token;
  },
};
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  CLEAR_TOKEN(state) {
    state.token = null;
  },
};
const actions = {
  setToken({ commit }, token) {
    commit('SET_TOKEN', token);
  },
  clearToken({ commit }) {
    commit('CLEAR_TOKEN');
  },
  async logout({ commit }) {
    localStorage.removeItem('token');
    commit('CLEAR_TOKEN');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
