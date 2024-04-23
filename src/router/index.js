import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LinkView from "@/views/LinkView.vue";
import SettingsView from "@/views/SettingsView.vue"

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView
    },
    {
        path: "/link",
        name: "link",
        component: LinkView
    },
    {
        path: "/settings",
        name: "settings",
        component: SettingsView
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router