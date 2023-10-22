// @ts-nocheck
import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { LOGIN_PAGE_PATH } from '@/configs/routePath';

const clientSystemApi = axios.create({
  baseURL: import.meta.env.VITE_SYSTEM_API,
  timeout: 15000,
});

clientSystemApi.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: store.getters['AUTH/getToken']
        ? `Bearer ${store.getters['AUTH/getToken']}`
        : undefined,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...config.headers,
    };
    return config;
  },
  (error) => Promise.reject(error),
);

clientSystemApi.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      return response?.data;
    } else {
      console.warn('status # 200');
    }
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      // Thực hiện các hành động như đăng nhập lại hoặc hiển thị thông báo

      await router.replace({
        path: LOGIN_PAGE_PATH,
        replace: true,
      });
    }
    throw error;
  },
);

export default clientSystemApi;
