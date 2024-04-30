import { defineStore } from "pinia";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import config from "@/config";

export const useUserStore = defineStore('user', {
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
        async login(username, password) {
            try {
                this.isLoggingIn = true;

                const data = {username, password};
                const response = await axios.post(config.backendUrl + '/login/', data, {
                    headers: {
                        'Content-Type': "application/x-www-form-urlencoded"
                    }
                })

                this.token = response.data.access_token; // backend?
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
                localStorage.setItem('token', this.token);

                this.error = null;
                this.loginMessage = null;
                this.isLoggingIn = false;
            } catch {
                this.isLoggingIn = false;
                this.error = 'Cannot log in, wrong password! Try again.';
            }
        },

        logout() {
            this.token = null;
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        },

        async register(first_name, last_name, email, username, password){
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
                console.log(useUserStore().users)
            } catch {
                this.error = 'Cannot load events'
            }
        }
    }
})