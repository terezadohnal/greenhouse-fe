import { defineStore } from 'pinia';
import axios from 'axios';
import config from '@/config';

export const useMeasurementStore = defineStore('measurement', {
  state() {
    return {
      error: null,
      isLoading: false,
      status: 'inactive',
    };
  },

  actions: {
    async startAEMeasurement() {
      try {
        this.isLoading = true;
        const response = await axios.post(
          config.backendUrl + '/acoustic/start_rec'
        );
        console.log({ response });
        this.status = 'active';
        this.error = null;
        this.isLoading = false;
      } catch {
        this.error = 'Cannot start AE measurement';
      }
    },
    async pauseAEMeasurement() {
      try {
        this.isLoading = true;
        const response = await axios.post(
          config.backendUrl + '/acoustic/pause_rec'
        );

        console.log({ response });
        this.status = 'paused';
        this.error = null;
        this.isLoading = false;
      } catch {
        this.error = 'Cannot pause AE measurement';
      }
    },
    async stopAEMeasurement() {
      try {
        this.isLoading = true;
        const response = await axios.post(
          config.backendUrl + '/acoustic/stop_rec'
        );
        console.log({ response });
        this.status = 'stopped';
        this.error = null;
        this.isLoading = false;
      } catch {
        this.error = 'Cannot stop AE measurement';
      }
    },
    async startRGBMeasurement() {
      try {
        this.isLoading = true;
        const response = await axios.post(
          config.backendUrl + '/cameras/start_rec' // TODO: change to the correct endpoint, not ready yet
        );
        this.error = null;
        this.isLoading = false;
      } catch {
        this.error = 'Cannot start RGB Camera measurement';
      }
    },
  },
});
