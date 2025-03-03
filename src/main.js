// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// fonts
import '@/assets/fonts.css'
import './assets/Zen_Old_Mincho/ZenOldMincho-Black.ttf'
import './assets/Zen_Kurenaido/ZenKurenaido-Regular.ttf'

// animate
import 'animate.css'

// WOW.js
// import { WOW } from 'wowjs'

// 引入 Vuetify 和 Vuetify 樣式
import vuetify from './plugins/vuetify'
import 'vuetify/styles'

const app = createApp(App)

// 註冊插件並使用 Vuetify
registerPlugins(app)
app.use(vuetify) // 確保在這裡使用 vuetify

// 在 Vue 生命週期中初始化 WOW.js
app.mount('#app')

// app.config.globalProperties.$nextTick(() => {
//   new WOW().init() // 確保在 DOM 完成後初始化 WOW.js
// })
