import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import "vue-toastification/dist/index.css";

import Toast from "vue-toastification";

createApp(App).use(store).use(router).use(Toast).mount('#app')
