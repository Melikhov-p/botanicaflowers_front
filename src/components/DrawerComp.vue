<script setup>
import DrawerHeader from '@/components/DrawerHeader.vue'
import { inject } from 'vue'

defineProps({
  liked_products: Array,
  client: Object,
  login: Function,
  logout: Function
})
const addLike = inject('addLike')

</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-1/3 h-full fixed right-0 top-0 z-20 p-5">

    <DrawerHeader :client="client" :login="login" :logout="logout"/>

    <div class="flex flex-col mt-10" v-if="client">
      <h2 class="font-bold text-2xl">Вам понравилось: </h2>
      <div class="flex flex-col">
        <p v-if="liked_products.length === 0" class="text-center text-2xl font-bold mt-56">Тут пусто</p>
        <div v-else v-for="product in liked_products" :key="product.id" class="flex flex-row mt-2 items-center border rounded">
            <img :src="product.image" alt="product" class="rounded w-32 justify-self-start" />
            <div class="ml-5 flex flex-col w-2/3">
              <span class="text-lg">{{ product.name }}</span>
              <span v-if="product.discount_percent > 0">
              <span class="line-through decoration-rose-400">{{ product.price }} ₽</span><sup v-if="product.discount_percent > 0" class="text-xs text-rose-400">-{{ product.discount_percent }}%</sup><span class="font-bold ml-2">{{ product.total_price }} ₽</span>
            </span>
              <span v-else>{{ product.total_price }} ₽</span>
            </div>
          <div class="">
            <img :src="product.isLiked ? '/like-2.svg' : '/like-1.svg'" alt="like-1" @click="addLike(product.id)" class="w-10 cursor-pointer mr-5" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>