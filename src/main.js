/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import router from "@/router/index.js";

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App).use(router)

registerPlugins(app)

app.mount('#app')
