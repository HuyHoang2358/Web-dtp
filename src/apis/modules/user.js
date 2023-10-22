import Api from '../../apis';
import store from '../../store';
import {
  API_CREATE_USER,
  API_DELETE_USER,
  API_EDIT_USER,
  API_GET_PROFILE,
  API_GET_USERS,
  API_SEARCH_USER,
} from '@/configs/apiPath';

export const headers = {
  Authorization: `Bearer ${store.getters['AUTH/getToken']}`,
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
export default {
  get_users(page, pageSize) {
    const endpoint = API_GET_USERS + '?page=' + page + '&size=' + pageSize;
    return Api.systemApi().get(endpoint, { headers });
  },

  search_user(searchValue, page, pageSize) {
    const endpoint = `${API_SEARCH_USER}?page=${page}&searchValue=${searchValue}&size=${pageSize}`;
    return Api.systemApi().get(endpoint, { headers });
  },

  add_user(data) {
    return Api.systemApi().post(API_CREATE_USER, data, { headers });
  },

  update_user(data) {
    return Api.systemApi().post(API_EDIT_USER, data, { headers });
  },

  delete_user(data) {
    return Api.systemApi().post(API_DELETE_USER, data, { headers });
  },
  get_profile() {
    return Api.systemApi().get(API_GET_PROFILE, { headers });
  },
};
