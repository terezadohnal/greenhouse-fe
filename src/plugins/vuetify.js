/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'



// Composables
import { createVuetify } from 'vuetify'
import { VTimePicker } from 'vuetify/labs/VTimePicker'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

const customTheme = {
  dark: false,
  colors: {
    "dark-green": '#82C325',
  }
}
export default createVuetify({
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme
    }
  },
  components: {
    VTimePicker,
  },
})


