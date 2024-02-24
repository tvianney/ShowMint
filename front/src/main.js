import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routers from './router/index.js'

createApp(App).use(routers).mount('#app')
