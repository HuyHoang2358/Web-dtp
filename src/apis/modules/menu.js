import Api from '../../apis';
import store from '../../store';
import {
  API_GET_CHILDS_MENUS,
  API_ADD_NEW_MENU,
  API_UPDATE_NEW_MENU,
  API_GET_MENUS,
  API_DELETE_MENU,
} from '@/configs/apiPath';

export const headers = {
  Authorization: `Bearer ${store.getters['AUTH/getToken']}`,
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
export default {
  getAllMenus() {
    return Api.systemApi().get(API_GET_MENUS, { headers });
  },
  getChildMenus(url) {
    return Api.systemApi().get(`${API_GET_CHILDS_MENUS}?url=${url}`, {
      headers,
    });
  },
  addMenu(data) {
    return Api.systemApi().post(API_ADD_NEW_MENU, data, { headers });
  },
  updateMenu(data) {
    return Api.systemApi().post(API_UPDATE_NEW_MENU, data, { headers });
  },
  deleteMenu(menuId) {
    return Api.systemApi().post(
      API_DELETE_MENU,
      {
        menuList: [menuId],
      },
      { headers },
    );
  },
};
