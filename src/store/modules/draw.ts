// @ts-nocheck
const state = {
  points: [],
  drawing: null, // 0 draw line segment; 1 measure line segment; 2 draw polygon; 3 measure area
  polyline: null,
  polygon: null,
  labels: [],
  area_label: null,
  point_tmp: null,
  label_tmp: null,
  polyline_tmp: null,
  polygon_tmp: null,
  num: 0,
};

const getters = {
  getPoints(state) {
    return state.points;
  },
  getPolyline(state) {
    return state.polyline;
  },
  getPolygon(state) {
    return state.polygon;
  },
  getLabels(state) {
    return state.labels;
  },
  getAreaLabel(state) {
    return state.area_label;
  },
  getNum(state) {
    return state.num;
  },
  getPointTmp(state) {
    return state.point_tmp;
  },
  getLabelTmp(state) {
    return state.label_tmp;
  },
  getPolylineTmp(state) {
    return state.polyline_tmp;
  },
  getPolygonTmp(state) {
    return state.polygon_tmp;
  },
  getDrawing(state) {
    return state.drawing;
  },
};
const mutations = {
  ADD_POINT(state, point) {
    state.points.push(point);
  },
  CLEAR_POINTS(state) {
    state.points = [];
  },

  SET_POLYLINE(state, polyline) {
    state.polyline = polyline;
  },
  CLEAR_POLYLINE(state) {
    state.polyline = null;
  },

  SET_POLYGON(state, polygon) {
    state.polygon = polygon;
  },
  CLEAR_POLYGON(state) {
    state.polygon = null;
  },

  SET_NUM(state, num) {
    state.num = num;
  },
  CLEAR_NUM(state) {
    state.num = 0;
  },
  ADD_TO_NUM(state, unit) {
    state.num += unit;
  },

  SET_LABEL_TMP(state, label_tmp) {
    state.label_tmp = label_tmp;
  },
  CLEAR_LABEL_TMP(state) {
    state.label_tmp = null;
  },
  SET_AREA_LABEL(state, label) {
    state.area_label = label;
  },
  CLEAR_AREA_LABEL(state) {
    state.area_label = null;
  },

  SET_POLYLINE_TMP(state, polyline_tmp) {
    state.polyline_tmp = polyline_tmp;
  },
  CLEAR_POLYLINE_TMP(state) {
    state.polyline_tmp = null;
  },

  SET_POLYGON_TMP(state, polygon_tmp) {
    state.polygon_tmp = polygon_tmp;
  },
  CLEAR_POLYGON_TMP(state) {
    state.polygon_tmp = null;
  },

  SET_POINT_TMP(state, point_tmp) {
    state.point_tmp = point_tmp;
  },
  CLEAR_POINT_TMP(state) {
    state.point_tmp = null;
  },

  ADD_LABEL(state, label) {
    state.labels.push(label);
  },
  CLEAR_LABELS(state) {
    state.labels = [];
  },

  SET_DRAWING(state, drawing) {
    state.drawing = drawing;
  },
  CLEAR_DRAWING(state) {
    state.drawing = null;
  },
};
const actions = {
  addPoint({ commit }, point) {
    commit('ADD_POINT', point);
  },
  clearPoints({ commit }) {
    commit('CLEAR_POINTS');
  },

  setPolyline({ commit }, polyline) {
    commit('SET_POLYLINE', polyline);
  },
  clearPolyline({ commit }) {
    commit('CLEAR_POLYLINE');
  },

  setPolygon({ commit }, polygon) {
    commit('SET_POLYGON', polygon);
  },
  clearPolygon({ commit }) {
    commit('CLEAR_POLYGON');
  },

  setPointTmp({ commit }, point_tmp) {
    commit('SET_POINT_TMP', point_tmp);
  },
  clearPointTmp({ commit }) {
    commit('CLEAR_POINT_TMP');
  },

  setLabelTmp({ commit }, label_tmp) {
    commit('SET_LABEL_TMP', label_tmp);
  },
  clearLabelTmp({ commit }) {
    commit('CLEAR_LABEL_TMP');
  },

  setPolylineTmp({ commit }, polyline_tmp) {
    commit('SET_POLYLINE_TMP', polyline_tmp);
  },
  clearPolylineTmp({ commit }) {
    commit('CLEAR_POLYLINE_TMP');
  },

  setPolygonTmp({ commit }, polygon_tmp) {
    commit('SET_POLYGON_TMP', polygon_tmp);
  },
  clearPolygonTmp({ commit }) {
    commit('CLEAR_POLYGON_TMP');
  },

  setNum({ commit }, num) {
    commit('SET_NUM', num);
  },
  addToNum({ commit }, unit) {
    commit('ADD_TO_NUM', unit);
  },
  clearNum({ commit }) {
    commit('CLEAR_NUM');
  },

  addLabel({ commit }, label) {
    commit('ADD_LABEL', label);
  },
  clearLabels({ commit }) {
    commit('CLEAR_LABELS');
  },

  setDrawing({ commit }, drawing) {
    commit('SET_DRAWING', drawing);
  },
  clearDrawing({ commit }) {
    commit('CLEAR_DRAWING');
  },
  setAreaLabel({ commit }, label) {
    commit('SET_AREA_LABEL', label);
  },
  clearAreaLabel({ commit }) {
    commit('CLEAR_AREA_LABEL');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
