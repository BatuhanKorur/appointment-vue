import './assets/main.pcss'
import 'vue3-toastify/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import AppLayout from '@/layouts/AppLayout.vue'
const app = createApp(App)
  .component('AppLayout', AppLayout)

app.mount('#app')
