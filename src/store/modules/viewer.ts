// @ts-nocheck
const state = {
  viewer: null,
  tileset: [],
  entities: [],
  selected_entity: null,
  handles: [],
  nameOverLay: null,
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
  getSelectedEntity(state) {
    return state.selected_entity;
  },
  getHandles(state) {
    return state.handles;
  },
  getNameOverLay(state) {
    return state.nameOverLay;
  },
};
const mutations = {
  CLEAR_NAME_OVERLAY(state) {
    state.nameOverLay = null;
  },

  SET_NAME_OVERLAY(state, nameOverLay) {
    state.nameOverLay = nameOverLay;
  },

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

  SET_SELECTED_ENTITY(state, selected_entity) {
    state.selected_entity = selected_entity;
  },
  CLEAR_SELECTED_ENTITY(state) {
    state.selected_entity = null;
  },
  PUSH_HANDLE(state, handle) {
    state.handles.push(handle);
  },
  CLEAR_HANDLES(state) {
    state.handles = [];
  },
};
const actions = {
  clearNameOverLay({ commit }) {
    commit('CLEAR_NAME_OVERLAY');
  },
  setNameOverLay({ commit }, nameOverLay) {
    commit('SET_NAME_OVERLAY', nameOverLay);
  },
  pushHandle({ commit }, handle) {
    commit('PUSH_HANDLE', handle);
  },
  clearHandle({ commit }) {
    commit('CLEAR_HANDLES');
  },
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

  setSelectedEntity({ commit }, selected_entity) {
    commit('SET_SELECTED_ENTITY', selected_entity);
  },
  clearSelectedEntity({ commit }) {
    commit('CLEAR_SELECTED_ENTITY');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
