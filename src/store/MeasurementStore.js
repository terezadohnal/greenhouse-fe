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
            isLoading: false
        }
    },

    getters: {
        isAuthenticated: state => state.token !== null,
        user: state => jwtDecode(state.token)
    },

    actions: {
        async measureTestRGB() {
            try {
                this.isLoading = true;
                const response = await axios.post(config.backendUrl + '/rgb/capturefake')

                // this.token = response.data.access_token; // backend?
                // axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;

                this.error = null;
                this.loginMessage = null;
                this.isLoading = false;



                return response.data
            } catch {
                this.isLoading = false;
                this.error = 'Cannot log in, wrong password! Try again.';
            }
        },

        async getRGBPhotos() {
            try {
                this.isLoading = true;
                const response = await axios.get(config.backendUrl + '/rgb-photos/how-many/')
                this.error = null;
                this.loginMessage = null;
                this.isLoading = false;
                console.log(response.data)
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

                // this.token = response.data.access_token; // backend?
                // axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;

                this.error = null;
                this.loginMessage = null;
                this.isLoading = false;
                console.log(response.data)
                return response.data
            } catch {
                this.isLoading = false;
                this.error = 'Cannot log in, wrong password! Try again.';
            }
        },

        logout() {
            this.token = null;
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        },

        async register(first_name, last_name, email, username, password) {
            try {
                this.isLoggingIn = true;
                const data = {first_name, last_name, email, username, password};
                await axios.post(config.backendUrl + '/register/', data);

                this.error = null;
                this.loginMessage = null;
                this.isLoggingIn = false;

            } catch {
                this.error = 'Cannot register!';
            }
        },

        setAfterLoginRoute(route) {
            this.afterLoginRoute = route;
        },

        async loadAll() {
            try {
                this.isLoading = true;
                const response = await axios.get(config.backendUrl + '/users/');
                this.users = response.data;
                this.error = null;
                this.isLoading = false;
            } catch {
                this.error = 'Cannot load events'
            }
        },

        async editUser(id, first_name, last_name, email, username, role) {
            try {
                const data = {
                    "email": email,
                    "username": username,
                    "first_name": first_name,
                    "last_name": last_name,
                    "role": role
                };
                await axios.put(config.backendUrl + '/edit/' + id, data);
                this.error = null;

            } catch {
                this.error = 'User information can\'t be updated.';
            }
        },

        async resetPassword(id, newPassword) {
            try {
                const data = {
                    "new_password": newPassword,
                };
                await axios.put(config.backendUrl + '/password-reset/' + id, data);
                this.error = null;

            } catch {
                this.error = 'Can\'t reset password.';
            }
        },
    }
})