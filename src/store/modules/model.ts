// @ts-nocheck
const state = {
  model: null,
};

const getters = {
  getModel(state) {
    return state.model;
  },
};
const mutations = {
  SET_Model(state, model) {
    state.model = model;
  },

  CLEAR_MODEL(state) {
    state.model = null;
  },
};
const actions = {
  setModel({ commit }, model) {
    commit('SET_MODEL', model);
  },
  clearModel({ commit }) {
    commit('CLEAR_MODEL');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
