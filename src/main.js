/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// fonts
import './assets/fonts.css'

// 引入 Vuetify 和 Vuetify 樣式
import vuetify from './plugins/vuetify'
import 'vuetify/styles'

const app = createApp(App)

// 註冊插件並使用 Vuetify
registerPlugins(app)
app.use(vuetify) // 確保在這裡使用 vuetify

app.mount('#app')
