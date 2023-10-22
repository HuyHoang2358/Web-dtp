import Api from '../../apis';
import store from '../../store';
import {
  API_ADD_NEW_ROLE,
  API_DELETE_ROLE,
  API_EDIT_ROLE,
  API_GET_ROLE,
  API_GET_ROLES,
} from '@/configs/apiPath';

export const headers = {
  Authorization: `Bearer ${store.getters['AUTH/getToken']}`,
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
export default {
  get_roles() {
    return Api.systemApi().get(API_GET_ROLES, { headers });
  },
  async getRoleDetail(roleId) {
    try {
      const response = await Api.systemApi().get(`${API_GET_ROLE}?roleId=${roleId}`, {
        headers,
      });
      console.log(response.data.data);

      return {
        roleId: response.data.data.role.roleId,
        roleName: response.data.data.role.roleName,
        appId: response.data.data.role.appId,
        parentId: '',
        menuInRole: response.data.data.menuInRole.map((menu) => {
          return menu.id;
        }),
        rightInRole: response.data.data.rightInRole.map((right) => {
          return right.rightId;
        }),
        rightInRoleDetail: response.data.data.rightInRole.map((right) => {
          return {
            id: right.rightId,
            name: right.rightName,
          };
        }),
        userInRole: response.data.data.userInRole.map((user) => {
          return user.userId;
        }),
        userInRoleDetail: response.data.data.userInRole.map((user) => {
          return {
            id: user.userId,
            name: user.name,
          };
        }),
      };
    } catch (e) {
      console.log({
        Type: 'Err API getRoleDetail',
        File: 'apis/modules/role.js',
        Error: e,
      });
    }
  },

  addRole(data) {
    return Api.systemApi().post(API_ADD_NEW_ROLE, data, { headers });
  },
  updateRole(data) {
    return Api.systemApi().post(API_EDIT_ROLE, data, { headers });
  },
  deleteRole(listRoleId) {
    return Api.systemApi().post(API_DELETE_ROLE, { roleList: listRoleId }, { headers });
  },
  async getRoleList() {
    try {
      const response = await Api.systemApi().get(API_GET_ROLES, { headers });
      console.log(response);
      return response.data.data.map((item) => {
        return {
          roleId: item.roleId,
          roleName: item.roleName,
        };
      });
    } catch (e) {
      console.log({
        Type: 'Err API getRoleList',
        File: 'apis/modules/role.js',
        Error: e,
      });
    }
  },
};
