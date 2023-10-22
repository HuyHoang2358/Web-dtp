import { API_GENERATE_TOKEN } from '@/configs/apiPath';
import { HOME_PAGE_PATH } from '@/configs/routePath';
import { useMutation } from '@tanstack/vue-query';
import store from '@/store';
import router from '@/router';
import clientSystemApi from '@/services/clientSystemApi';

export type Credentials = {
  identity?: string;
  password?: string;
};

export default function useAuth() {
  const loginMutation = useMutation((credentials: Credentials) => {
    const au = btoa(credentials.identity + ':' + credentials.password);
    return clientSystemApi.get(API_GENERATE_TOKEN, {
      headers: {
        Authorization: 'Basic ' + au,
      },
      params: {
        appId: 'SYSTEM',
        grantType: 'PASSWORD_GRANT',
        secret: import.meta.env.VITE_SECRET,
      },
    });
  });

  async function login(credentials: Credentials) {
    loginMutation.mutate(credentials, {
      onSuccess: (data) => {
        const token = data?.data?.accessToken;
        localStorage.setItem('token', token);
        store.dispatch('AUTH/setToken', token);
        router.replace(HOME_PAGE_PATH);
      },
    });
  }

  return {
    login,
    loginMutation,
  };
}
