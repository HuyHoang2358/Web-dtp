// @ts-nocheck
const state = {
  viewer: null,
  tileset: [],
  entities: [],
};

const getters = {
  getViewer(state) {
    return state.viewer;
  },
  getTileset(state) {
    return state.tileset;
  },
  getEntities(state) {
    return state.entities;
  },
};
const mutations = {
  SET_VIEWER(state, viewer) {
    state.viewer = viewer;
  },
  CLEAR_VIEWER(state) {
    state.viewer = null;
  },
  SET_TILESET(state, tileset) {
    state.tileset = tileset;
  },
  PUSH_TILE(state, new_tile) {
    state.tileset.push(new_tile);
  },
  CLEAR_TILESET(state) {
    state.tileset = null;
  },

  SET_ENTITIES(state, entities) {
    state.entities = entities;
  },
  PUSH_ENTITY(state, new_entity) {
    state.entities.push(new_entity);
  },
  CLEAR_ENTITIES(state) {
    state.entities = null;
  },
};
const actions = {
  setViewer({ commit }, viewer) {
    commit('SET_VIEWER', viewer);
  },
  clearViewer({ commit }) {
    commit('CLEAR_VIEWER');
  },
  setTileset({ commit }, tileset) {
    commit('SET_TILESET', tileset);
  },
  pushTile({ commit }, new_tile) {
    commit('PUSH_TILE', new_tile);
  },
  clearTileset({ commit }) {
    commit('CLEAR_TILESET');
  },

  setEntities({ commit }, entities) {
    commit('SET_ENTITIES', entities);
  },
  pushEntity({ commit }, entity) {
    commit('PUSH_ENTITY', entity);
  },
  clearEntities({ commit }) {
    commit('CLEAR_ENTITIES');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
