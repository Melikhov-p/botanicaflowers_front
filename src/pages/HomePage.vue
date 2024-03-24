<script setup>
import ProductList from '@/components/ProductList.vue'
import { inject, onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'
import DrawerComp from '@/components/DrawerComp.vue'

const client = inject('client')
const DrawerOpen = inject('DrawerOpen')

const products = ref([])
const filters = reactive({
  ordering: '',
  searchQuery: '',
  categoryFilter: ''
})
const categories = ref([])
const onChangeSelect = event => {  // Изменение сортировки
  filters.ordering = event.target.value
}
const onChangeSearchInput = event => {  // Изменение поиска
  filters.searchQuery = event.target.value
}

const onChangeCategoryFilter = event => {  // Изменение категории
  filters.categoryFilter = event.target.value
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
  if (!localStorage.getItem('token')) {
    alert('Для добавление в избранное необходимо авторизоваться')
    return
  }
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
  await fetchProducts()
  await fetchCategories()
  await fetchLikes()
})

provide('addLike', addLike)  // Прокидывает функцию "глобально", чтобы не прокидывать пропсы из компонента в компонент

watch(filters, fetchProducts)  // При изменении фильтров
</script>

<template>
      <DrawerComp v-if="DrawerOpen" :liked_products="products.filter(product => product.isLiked)" :client="client"/>

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
  <ProductList :products="products" />
</template>

<style scoped>

</style>