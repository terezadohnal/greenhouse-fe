import {defineStore} from "pinia";
import axios from "axios";
import config from "@/config";

export const useMeasurementStore = defineStore('measurement', {
    state() {
        return {
            error: null,
            isLoading: false,
            measurements: []
        }
    },

    actions: {
        async loadAll() {
            try {
                this.isLoading = true;
                const response = await axios.get(config.backendUrl + '/data/get_data');
                this.measurements = response.data;
                this.error = null;
                this.isLoading = false;
            } catch {
                this.error = 'Cannot load measurements'
            }
        },

    }
})