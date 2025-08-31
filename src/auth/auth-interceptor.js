import axios from "axios";
import { decryptData } from "@/utils/encrypt";
import { useAuthStore } from "@/stores/accountData";

axios.interceptors.request.use((config) => {
  let token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = useAuthStore();
    const isAuthError = error.response && error.response.status === 401;
    console.log(error.config);
    if (
      isAuthError &&
      auth.refresh &&
      error.config.url != "/api/token/" &&
      error.config.url != "/api/token/refresh/"
    ) {
      try {
        await auth.refreshToken();
        error.config.headers.Authorization = `Bearer ${auth.access}`;
        return axios.request(error.config);
      } catch (refreshError) {
        auth.logout();
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
