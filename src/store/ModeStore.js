import { defineStore } from 'pinia';

export const useModeStore = defineStore('mode', {
  state() {
    return {
      mode: 'production',
      error: null,
      isLoading: false,
    };
  },

  getters: {
    getMode: (state) => state.mode,
    isTestMode: (state) => state.mode === 'test',
  },

  actions: {
    setMode(mode) {
      try {
        this.isLoading = true;
        this.mode = mode;
        this.error = null;
        this.isLoading = false;
      } catch {
        this.isLoading = false;
        this.error = 'Cannot set mode!';
      }
    },
  },
});
