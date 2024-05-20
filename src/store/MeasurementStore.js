import {defineStore} from "pinia";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import config from "@/config";

export const useMeasurementStore = defineStore('measurement', {
    state() {
        const oldToken = localStorage.getItem('token');

        if (oldToken) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + oldToken;
        }

        return {
            token: oldToken,
            error: null,
            isLoggingIn: false,
            loginMessage: null,
            afterLoginRoute: null,
            users: [],
            isLoading: false,
            measurements: [],
        }
    },

    getters: {
        isAuthenticated: state => state.token !== null,
        user: state => jwtDecode(state.token)
    },

    actions: {

        async loadAll() {
            try {
                this.isLoading = true;
                const response = await axios.get(config.backendUrl + '/data/get_data')
                console.log(response.data)
                this.measurements = response.data;
                this.error = null;
                this.loginMessage = null;
                this.isLoading = false;
            } catch {
                this.isLoading = false;
                this.error = 'Cannot load measurements';
            }
        },

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


        async measureTestRGB() {
            try {
                this.isLoading = true;
                const response = await axios.post(config.backendUrl + '/rgb/capturefake')

                this.error = null;
                this.loginMessage = null;
                this.isLoading = false;

                return response.data
            } catch {
                this.isLoading = false;
                this.error = 'Cannot log in, wrong password! Try again.';
            }
        },

        async measureRGB() {
            try {
                this.isLoading = true;
                const response = await axios.post(config.backendUrl + '/rgb/capture')

                this.error = null;
                this.loginMessage = null;
                this.isLoading = false;

                if (response.data || response.data.length === 0) {
                    this.error = 'Cannot measure RGB photos, check the camera connection.';
                    return;
                }

                return response.data
            } catch {
                this.isLoading = false;
                this.error = 'Cannot measure RGB photos, check the camera connection.';
            }
        },

        async getRGBPhotos() {
            try {
                this.isLoading = true;
                const response = await axios.get(config.backendUrl + '/rgb-photos/how-many/')
                this.error = null;
                this.loginMessage = null;
                this.isLoading = false;
                return response.data
            } catch {
                this.isLoading = false;
                this.error = 'Cannot log in, wrong password! Try again.';
            }
        },

        async getRGBPhotosNumber() {
            try {
                this.isLoading = true;
                const response = await axios.post(config.backendUrl + '/rgb-photos/how-many')

                this.error = null;
                this.loginMessage = null;
                this.isLoading = false;
                return response.data
            } catch {
                this.isLoading = false;
                this.error = 'Cannot log in, wrong password! Try again.';
            }
        },
    }
})
