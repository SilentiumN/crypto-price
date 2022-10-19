import { createApp } from 'vue'
import "@/assets/tailwind.css"
import App from './App.vue'
import store from "@/store/index"

createApp(App).use(store).mount('#app')
