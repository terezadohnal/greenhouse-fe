import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LinkView from "@/views/LinkView.vue";
import LoginView from "@/views/LoginView.vue";

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
        path: "/login",
        name: "login",
        component: LoginView
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router