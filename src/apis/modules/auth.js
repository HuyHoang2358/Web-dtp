import clientSystemApi from '@/apis/clientSystemApi';

export default {
  register() {
    return clientSystemApi.post('register');
  },
};
