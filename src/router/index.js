import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import LinkView from "@/views/LinkView.vue";
import SensorView from "@/views/SensorView.vue";

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
        path: "/sensor",
        name: "sensor",
        component: SensorView
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router