import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
    incrementAsync() {
      setTimeout(() => this.increment(), 1000);
    },
  },
  getters: {
    doubleCount: (state) => state.count * 2,
  },
});
