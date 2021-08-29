import { defineStore } from 'pinia';

interface MainState {
  navCollapse: boolean;
}

export const useMainStore = defineStore({
  id: 'main',
  state: (): MainState => ({
    navCollapse: false,
  }),
  getters: {},
  actions: {
    changeNavCollapse() {
      this.navCollapse = !this.navCollapse;
    },
  },
});
