// @ts-nocheck
import { createStore } from 'vuex';
import AuthStore from './modules/auth';
import ViewerStore from './modules/viewer';
import DrawStore from './modules/draw';

export default createStore({
  modules: {
    AUTH: AuthStore,
    VIEWER: ViewerStore,
    DRAW: DrawStore,
  },
});
