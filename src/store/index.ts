// @ts-nocheck
import { createStore } from 'vuex';
import AuthStore from './modules/auth';
import ViewerStore from './modules/viewer';
import DrawStore from './modules/draw';
import RouteStore from './modules/route';
import AreaStore from './modules/area';
import ModelStore from './modules/model';

export default createStore({
  modules: {
    AUTH: AuthStore,
    VIEWER: ViewerStore,
    DRAW: DrawStore,
    ROUTE: RouteStore,
    AREA: AreaStore,
    MODEL: ModelStore,
  },
});
