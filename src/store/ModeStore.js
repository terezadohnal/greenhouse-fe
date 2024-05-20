import {defineStore} from "pinia";
import axios from "axios";
import config from "@/config";

export const useModeStore = defineStore('mode', {
    state() {
        return {
            mode: "production",
            error: null,
            isLoading: false
        }
    },

    getters: {
        getMode: state => state.mode,
        isTestMode: state => state.mode === "test",
    },

    actions: {
        setMode(mode) {
            try {
                this.isLoading = true;
                this.mode = mode;
                this.error = null;
                this.isLoading = false;
                console.log('Mode set to: ' + mode)
            } catch {
                this.isLoading = false;
                this.error = 'Cannot set mode!';
            }
        }
    }
})
