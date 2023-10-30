// @ts-nocheck
const state = {
  points: [],
  point_entities: [],
  polygons: null,
};

const getters = {
  getPoints(state) {
    return state.points;
  },
  getPolygon(state) {
    return state.polygons;
  },
  getPointEntities(state) {
    return state.point_entities;
  },
};
const mutations = {
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

  SET_POLYGON(state, polygon) {
    state.polygon = polygon;
  },
  CLEAR_POLYGON(state) {
    state.polygon = null;
  },
};
const actions = {
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

  setPolygon({ commit }, polygon) {
    commit('SET_POLYGON', polygon);
  },
  clearPolygon({ commit }) {
    commit('CLEAR_POLYGON');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
