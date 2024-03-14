<script setup>
import { inject } from 'vue'

defineProps({
  id: Number,
  imageUrl: String,
  name: String,
  category: Object,
  price: Number,
  discount: Number,
  total_price: Number,
  isLiked: Boolean,
})
const addLike = inject('addLike')
</script>

<template>
  <div class="relative flex flex-col bg-white border border-zinc-300 rounded-lg p-5 hover:-translate-y-1.5 hover:shadow-xl transition hover:cursor-pointer hover:scale-105">
    <img :src="isLiked ? '/like-2.svg' : '/like-1.svg'" alt="like-1" @click="addLike(id)" class="absolute top-7 left-7 w-8" />
    <img v-if="discount > 0" src="/discount.svg" alt="discount" class="absolute top-7 right-7 w-8"/>
    <img :src="imageUrl" alt="product" class="rounded" />
    <p class="mt-2">{{ name }}</p>
    <p class="text-rose-400 font-light text-xs hover:text-rose-600 hover:underline w-fit">{{ category.name }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="font-bold text-rose-400">Цена: </span>

        <div>
          <span v-if="discount > 0">
            <span class="line-through decoration-rose-400">{{ price }} ₽</span><sup v-if="discount > 0" class="text-xs text-rose-400">-{{ discount }}%</sup><span class="font-bold ml-2">{{ total_price }} ₽</span>
          </span>
          <span v-else>{{ total_price }} ₽</span>
        </div>
      </div>

      <a class="border border-rose-400 rounded py-2 px-4 text-rose-400 hover:bg-rose-400 hover:text-white">Заказать</a>
    </div>
  </div>
</template>