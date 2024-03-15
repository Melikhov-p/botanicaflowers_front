<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import ProductList from '@/components/ProductList.vue'
import DrawerComp from '@/components/DrawerComp.vue'
import axios from 'axios'
import { onMounted, provide, reactive, ref, watch } from 'vue'
import ModalContactsComp from '@/components/ModalContactsComp.vue'


const DrawerOpen = ref(false)
const ModalContacts = ref(false)

const closeDrawer = () => {
  DrawerOpen.value = false
}
const openDrawer = () => {
  DrawerOpen.value = true
}
const openModalContacts = () => {
  ModalContacts.value = true
}
const closeModalContacts = () => {
  ModalContacts.value = false
}

const products = ref([])
const filters = reactive({
  ordering: '',
  searchQuery: '',
  categoryFilter: ''
})
const categories = ref([])
const client = ref(null)

const onChangeSelect = event => {  // Изменение сортировки
  filters.ordering = event.target.value
}
const onChangeSearchInput = event => {  // Изменение поиска
  filters.searchQuery = event.target.value
}

const onChangeCategoryFilter = event => {  // Изменение категории
  filters.categoryFilter = event.target.value
}


function AuthClient(phone, password) {
  let token = localStorage.getItem('token')
  if (token) {
    console.log(token)
    axios.get('http://localhost:8000/api/clients/', {
      'headers': {
        'Authorization': 'Token ' + token
      }
    }).then(resp => client.value = resp.data[0])
    location.reload()
  } else {
    console.log('no token')
    console.log({ 'username': phone, 'password': password })
    axios.post('http://localhost:8000/api/login/', { 'username': phone, 'password': password }).then(resp => {
      token = resp.data.token
      localStorage.setItem('token', token)
      axios.get('http://localhost:8000/api/clients/', {
        'headers': {
          'Authorization': 'Token ' + token
        }
      }).then(resp => client.value = resp.data[0])
      location.reload()
    })
  }
}

function getClient() {
  if (localStorage.getItem('token')) {
    console.log('loading local client')
    axios.get('http://localhost:8000/api/clients/', {
      'headers': {
        'Authorization': 'Token ' + localStorage.getItem('token')
      }
    }).then(resp => {
      if ('error' in resp.data) {
        localStorage.removeItem('token')
        console.log(resp.data)
      } else {
        client.value = resp.data[0]
      }
    }).catch(function(error) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        console.log('token expired')
      }
    })
  }
}

const LogOut = () => {
  localStorage.removeItem('token')
  DrawerOpen.value = false
  client.value = null
  console.log('LogOut')
  location.reload()
}

const fetchProducts = async () => {  // Запрос всех товаров
  const params = {
    ordering: filters.ordering
  }
  if (filters.searchQuery) {
    params.search = filters.searchQuery
  }
  if (filters.categoryFilter) {
    params.category = filters.categoryFilter
  }
  try {
    const { data } = await axios.get(`http://localhost:8000/api/products`, {
      params
    })

    products.value = data
    await fetchLikes()
  } catch (e) {
    console.log(e)
  }
}

const fetchLikes = async () => {  // Запрос лайков
  if (!localStorage.getItem('token')) return
  try {
    const { data } = await axios.get(`http://localhost:8000/api/likes`, {
      'headers': {
        'Authorization': 'Token ' + localStorage.getItem('token') //localStorage.getItem('token')
      }
    })

    products.value = products.value.map(product => {  // Добавление лайков товарам которые лайкнул пользователь
      const like = data.find(like => like.product === product.id)

      if (like) {
        return { ...product, isLiked: true }
      }
      return { ...product, isLiked: false }
    })
  } catch (e) {
    console.log(e)
  }
}

const fetchCategories = async () => {  // Запрос категорий
  try {
    const { data } = await axios.get(`http://localhost:8000/api/category`)
    categories.value = data
  } catch (e) {
    console.log(e)
  }
}

const addLike = async (product_id) => {  // Добавление лайка
  try {
    await axios.post(`http://localhost:8000/api/likes/`, {
      'product': product_id
    }, {
      'headers': {
        'Authorization': 'Token ' + localStorage.getItem('token') //localStorage.getItem('token')
      }
    })
    await fetchLikes()
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {  // При монтировании (загрузке страницы)
  getClient()
  await fetchProducts()
  await fetchCategories()
  await fetchLikes()
})
watch(filters, fetchProducts)  // При изменении фильтров

provide('addLike', addLike)  // Прокидывает функцию "глобально", чтобы не прокидывать пропсы из компонента в компонент
provide('profileDrawerActions', {
  closeDrawer,
  openDrawer
})
</script>

<template>
  <div class="h-screen">

    <ModalContactsComp :close-modal-contacts="closeModalContacts" v-if="ModalContacts"/>
    <DrawerComp v-if="DrawerOpen" @close-drawer="closeDrawer" :liked_products="products.filter(product => product.isLiked)" :client="client" :login="AuthClient" :logout="LogOut" />

    <HeaderComp @open-drawer="openDrawer" :open-modal-contacts="openModalContacts"/>

    <div class="bg-white w-4/5 m-auto rounded shadow-xl my-5 p-5">
      <div class="flex justify-between items-center">
        <div class="flex gap-4">
          <select @change="onChangeCategoryFilter" class="py-2 px-4 text-2xl outline-none border rounded-md">
            <option value="">Все товары</option>
            <option v-for="category in categories" :key="category.id" :value="category.slug" class="hover:accent-white hover:text-black">{{ category.name }}</option>
          </select>
        </div>
        <div class="flex gap-4">
          <select @change="onChangeSelect" class="py-2 px-4 border rounded-md outline-0">
            <option value="name">По названию</option>
            <option value="-id" selected>По новизне</option>
            <option value="-discount_percent">Со скидкой</option>
            <option value="-price">По убыванию цены</option>
            <option value="price">По возрастанию цены</option>
          </select>
          <div class="relative">
            <img alt="search" src="/search.svg" class="absolute left-3 top-3" />
            <input placeholder="Поиск..." class="border rounded-md py-2 pl-10 pr-4 outline-0 focus:border-gray-400" @input="onChangeSearchInput" />
          </div>
        </div>
      </div>
      <ProductList :products="products"/>
    </div>

    <div>
      <a href="#" title="Вернуться к началу страницы" class="transition fixed bottom-5 left-10">
        <img src="/up.svg" alt="up" class="w-10 opacity-25" />
      </a>
    </div>

    <div class="bg-white w-4/5 m-auto shadow-xl my-5 p-5 flex justify-between items-center">
      <div>
        <p class="text-slate-800 font-light">ИП ФЕДЧЕНКО ЭЛИНА ИГОРЕВНА</p>
        <p class="text-slate-800 font-light">ОГРНИП 323310000078371</p>
        <p class="text-slate-800 font-light">ИНН 312342666634</p>
      </div>
      <div>
        <p class="font-light text-slate-800">BOTANICA©2024</p>
      </div>
      <div>
        <p class="font-light text-slate-800">+7 (930) 086-90-08</p>
        <p class="font-light text-slate-800">botanicaflowers.25@yandex.ru</p>
        <p class="font-light text-slate-800">Гражданский проспект 47, Белгород</p>
      </div>
    </div>
  </div>
</template>

<style>
</style>
