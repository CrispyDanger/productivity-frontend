import { defineStore } from "pinia";
import axios from "axios";
import { encryptData, decryptData } from "@/utils/encrypt";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {},
    access: null,
    refresh: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const res = await axios.post("/api/token/", { username, password });
        this.access = res.data.access;
        this.refresh = res.data.refresh;

        localStorage.setItem("access", this.access);
        localStorage.setItem("refresh", this.refresh);

        await this.getUser();
      } catch (err) {
        throw err;
      }
    },

    async getUser() {
      if (!this.access) return;
      const res = await axios.get("/api/account/me/", {
        headers: { Authorization: `Bearer ${this.access}` },
      });
      this.user = res.data;
      localStorage.setItem("user", encryptData(JSON.stringify(this.user)));
    },

    async refreshToken() {
      try {
        const res = await axios.post("/api/token/refresh/", {
          refresh: this.refresh,
        });
        this.access = res.data.access;
        localStorage.setItem("access", this.access);
      } catch (err) {
        this.logout();
      }
    },

    logout() {
      this.user = null;
      this.access = null;
      this.refresh = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
    },

    loadFromStorage() {
      const user = localStorage.getItem("user");
      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");

      this.user = user ? JSON.parse(decryptData(user)) : null;
      this.access = access ? access : null;
      this.refresh = refresh ? refresh : null;
    },
  },
  getters: {
    userData: (state) => state.user,
  },
});
