import { defineStore } from 'pinia';
import axios from 'axios';
import config from '@/config';

export const useMeasurementStore = defineStore('measurement', {
  state() {
    return {
      error: null,
      isLoading: false,
      recordingMode: null,
      status: 0,
    };
  },

  actions: {
    async startAEMeasurement() {
      try {
        this.isLoading = true;
        const response = await axios.post(
          config.backendUrl + '/acoustic/start_rec'
        );
        this.recordingMode = response.data.recording_mode;
        this.status = response.data.status;
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
        this.recordingMode = response.data.recording_mode;
        this.status = response.data.status;
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
        this.recordingMode = response.data.recording_mode;
        this.status = response.data.status;
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
