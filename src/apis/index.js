import request from 'axios';
/*import router from "@/router";*/
export default {
  systemApi() {
    /* api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Xử lý lỗi 401 ở đây
        if (error.response && error.response.status === 401) {
          // Thực hiện các hành động như đăng nhập lại hoặc hiển thị thông báo
          console.log("Token hết hạn. Đăng nhập lại.");

          router.push("/auth/login");
        }
        return Promise.reject(error);
      }
    );*/
    return request.create({
      baseURL: 'http://172.16.30.214:9999/api/',
    });
  },
  webApi() {
    return request.create({
      baseURL: 'http://172.16.30.214:8888/api/',
    });
  },
};
