import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import SettingsView from "@/views/SettingsView.vue"
import LoginView from "@/views/LoginView.vue";
import SigninView from "@/views/SigninView.vue";
import ConfigurationView from "@/views/ConfigurationView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView
    },
    {
        path: "/settings",
        name: "settings",
        component: SettingsView
    },
    {
        path: "/login",
        name: "login",
        component: LoginView
    },
    {
        path: "/signin",
        name: "signin",
        component: SigninView
    },
    {
        path: "/config",
        name: "config",
        component: ConfigurationView
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router