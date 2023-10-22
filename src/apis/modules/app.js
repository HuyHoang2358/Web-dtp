import Api from '../../apis';
import store from '../../store';
import { API_GET_APPS } from '@/configs/apiPath';

export const headers = {
  Authorization: `Bearer ${store.getters['AUTH/getToken']}`,
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
export default {
  getAllApps() {
    return Api.systemApi().get(API_GET_APPS, { headers });
  },
  async getAppList() {
    try {
      const response = await Api.systemApi().get(API_GET_APPS, { headers });
      return response.data.data.map((item) => {
        return {
          appId: item.appId,
          appName: item.appName,
        };
      });
    } catch (e) {
      console.log({
        Type: 'Err API',
        File: 'apis/modules/app.js',
        Error: e,
      });
    }
  },
};
