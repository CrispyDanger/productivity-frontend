import axios from "axios";
import { decryptdata } from "@/utils/encrypt";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = decryptdata(localStorage.getItem("access"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = useAuthStore();

    if (error.response.status === 401 && auth.refresh) {
      try {
        await auth.refreshToken();
        error.config.headers.Authorization = `Bearer ${auth.access}`;
        return api.request(error.config);
      } catch (refreshError) {
        auth.logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
