import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from '@/pages/HomePage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import ChatPreorderPage from '@/pages/ChatPreorderPage.vue'

const app = createApp(App)

const routes = [
  { path: '/', component: HomePage },
  { path: '/registration', component: RegisterPage },
  { path: '/preorder', component: ChatPreorderPage },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
