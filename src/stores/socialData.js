import { useAuthStore } from "./accountData";
import { defineStore } from "pinia";
import axios from "axios";

const auth = useAuthStore();

export const useSocialStore = defineStore("social", {
  state: () => ({
    feed: [],
  }),
  actions: {
    getSocialFeed() {
      if (auth.refresh) {
        axios.get("/api/social/").then((response) => {
          const responseData = response.data;
          this.feed = responseData;
        });
      }
    },
  },
  getters: {
    socialFeed: (state) => state.feed,
  },
});
