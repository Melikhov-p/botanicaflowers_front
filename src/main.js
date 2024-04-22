import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import App from './App.vue'
import HomePage from '@/pages/HomePage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import ChatPreorderPage from '@/pages/ChatPreorderPage.vue'
import ManagerPage from '@/pages/ManagerPage.vue'
import ManageGoodsPage from '@/pages/ManageGoodsPage.vue'
import EditProductPage from '@/pages/EditProductPage.vue'
import AddProductPage from '@/pages/AddProductPage.vue'

const app = createApp(App)

const routes = [
  { path: '/', component: HomePage },
  { path: '/registration', component: RegisterPage },
  { path: '/preorder', component: ChatPreorderPage },
  { path: '/manager', component: ManagerPage },
  { path: '/manage_goods', component: ManageGoodsPage },
  { path: '/edit_product/:id', component: EditProductPage },
  { path: '/add_product', component: AddProductPage },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)
app.use(autoAnimatePlugin)
app.use(Cropper)

app.mount('#app')
