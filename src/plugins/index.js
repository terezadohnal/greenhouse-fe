/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import { createPinia } from "pinia";

const pinia = createPinia()

export function registerPlugins (app) {
  app.use(vuetify)
  app.use(pinia)
}
