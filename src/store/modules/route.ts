// @ts-nocheck
const state = {
  points: [],
  point_entities: [],
  polyline: null,
  length: 0,
  model: null,
};

const getters = {
  getModel(state) {
    return state.model;
  },
  getPoints(state) {
    return state.points;
  },
  getPointEntities(state) {
    return state.point_entities;
  },
  getPolyline(state) {
    return state.polyline;
  },
  getLength(state) {
    return state.length;
  },
};
const mutations = {
  SET_MODEl(state, model) {
    state.model = model;
  },
  CLEAR_MODEL(state) {
    state.model = null;
  },
  SET_POINTS(state, points) {
    state.points = points;
  },
  ADD_POINT(state, point) {
    state.points.push(point);
  },
  CLEAR_POINTS(state) {
    state.points = [];
  },

  SET_POINT_ENTITIES(state, point_entities) {
    state.point_entities = point_entities;
  },
  ADD_POINT_ENTITY(state, point_entity) {
    state.point_entities.push(point_entity);
  },
  CLEAR_POINT_ENTITIES(state) {
    state.point_entities = [];
  },

  SET_POLYLINE(state, polyline) {
    state.polyline = polyline;
  },
  CLEAR_POLYLINE(state) {
    state.polyline = null;
  },
  CLEAR_LENGTH(state) {
    state.length = 0;
  },
  PLUS_TO_LENGTH(state, num) {
    state.length += num;
  },
};
const actions = {
  setModel({ commit }, model) {
    commit('SET_MODEl', model);
  },
  clearModel({ commit }) {
    commit('CLEAR_MODEL');
  },
  clearLength({ commit }) {
    commit('CLEAR_LENGTH');
  },
  plusToLength({ commit }, num) {
    commit('PLUS_TO_LENGTH', num);
  },
  setPoints({ commit }, points) {
    commit('SET_POINTS', points);
  },
  addPoint({ commit }, point) {
    commit('ADD_POINT', point);
  },
  clearPoints({ commit }) {
    commit('CLEAR_POINTS');
  },

  setPointEntities({ commit }, point_entities) {
    commit('SET_POINT_ENTITIES', point_entities);
  },
  addPointEntity({ commit }, point_entity) {
    commit('ADD_POINT_ENTITY', point_entity);
  },
  clearPointEntities({ commit }) {
    commit('CLEAR_POINT_ENTITIES');
  },

  setPolyline({ commit }, polyline) {
    commit('SET_POLYLINE', polyline);
  },
  clearPolyline({ commit }) {
    commit('CLEAR_POLYLINE');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
