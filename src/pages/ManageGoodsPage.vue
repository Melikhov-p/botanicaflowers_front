<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const products = ref([])

const fetchProducts = async () => {  // Запрос всех товаров
  try {
    const { data } = await axios.get(`http://localhost:8000/api/products/`, {})

    products.value = data
  } catch (e) {
    console.log(e)
  }
}


onMounted(async () => {
  await fetchProducts()
})
</script>

<template>
  <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mt-8">
    <router-link to="/add_product">
      <div class="relative flex flex-col bg-fuchsia-50 border border-zinc-300 rounded-lg p-5 hover:-translate-y-1.5 hover:shadow-xl transition hover:cursor-pointer hover:scale-105">
        <img src="/add-goods.svg" alt="add_goods" class="" />
        <div class="flex justify-center mt-12">
          <p class="font-bold text-2xl">Добавить</p>
        </div>
      </div>
    </router-link>
    <div v-for="product in products" :key="product.id" class="relative flex flex-col bg-white border border-zinc-300 rounded-lg p-5 hover:-translate-y-1.5 hover:shadow-xl transition hover:cursor-pointer hover:scale-105">
      <img v-if="product.discount > 0" src="/discount.svg" alt="discount" class="absolute top-7 right-7 w-8" />
      <img :src="product.image" alt="product" class="rounded" />
      <img :src="product.available ? '/available.svg' : '/unavailable.svg'" :title="product.available ? 'В наличии' : 'Нет в наличии'" alt="available" class="absolute top-7 left-7 w-8" />
      <p class="mt-2">{{ product.name }}</p>
      <p class="text-rose-400 font-light text-xs hover:text-rose-600 w-fit">{{ product.category.name }}</p>
      <div class="flex justify-between mt-5">
        <div class="flex flex-col">
          <span class="font-bold text-rose-400">Цена: </span>

          <div>
          <span v-if="product.discount > 0">
            <span class="line-through decoration-rose-400">{{ product.price }} ₽</span><sup v-if="product.discount > 0" class="text-xs text-rose-400">-{{ product.discount }}%</sup><span class="font-bold ml-2">{{ product.total_price }} ₽</span>
          </span>
            <span v-else>{{ product.total_price }} ₽</span>
          </div>
        </div>

        <router-link :to="'/edit_product/' + product.id"><a class="border border-rose-400 rounded py-2 px-4 text-rose-400 hover:bg-rose-400 hover:text-white">Редактировать</a></router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>