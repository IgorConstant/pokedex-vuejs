import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//CSS
import './assets/css/base.css'
import './assets/css/style.css'

createApp(App).use(router).mount('#app')