<script setup>
import DrawerHeader from '@/components/DrawerHeader.vue'
import { inject } from 'vue'

defineProps({
  liked_products: Array,
  client: Object,
})

const addLike = inject('addLike')
const AuthClient = inject('AuthClient')
const LogOut = inject('LogOut')
const { closeDrawer } = inject('profileDrawerActions')

</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70" @click="closeDrawer()"></div>
  <div class="bg-white w-1/3 h-full fixed right-0 top-0 z-20 p-5">

    <DrawerHeader :client="client" :login="AuthClient" :logout="LogOut" />

    <div class="flex flex-col mt-10" v-if="client">
      <h2 class="font-bold text-2xl">Вам понравилось: </h2>
      <div class="flex flex-col" v-auto-animate>
        <div v-if="liked_products.length === 0" class="self-center mt-16 w-2/3">
          <svg class="" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 0 512 512" xml:space="preserve">
        <ellipse style="fill:#EAEAED;" cx="256" cy="256" rx="256" ry="256" />
                  <path style="fill:#D9D9DD;" d="M511.747,267.09c-4.357,102.202-68.636,188.88-158.599,225.813L256,395.756l7.983-16.252
          l-32.92-32.919l-54.6-55.086l62.385-148.508l94.765,94.764l49.017-99.782L511.747,267.09z" />
                  <g>
          <path style="fill:#FF8C8A;" d="M256,395.756c53.058-55.68,148.355-128.519,148.355-205.331c0-40.967-33.211-74.179-74.177-74.179
            c-38.899,0-70.803,29.948-73.924,68.042L256,190.424l31.824,39.498L224.98,286.48l41.09,33.841l-25.136,7.734l35.533,22.724
            L256,395.756z" />
                    <path style="fill:#FF8C8A;" d="M238.848,142.991c-13.605-16.34-34.099-26.745-57.027-26.745c-40.967,0-74.177,33.213-74.177,74.179
            c0,77.822,95.088,147.437,148.356,205.331l6.689-39.901l-44.474-30.699l27.313-7.493l-38.915-32.631l58.494-56.56l-30.455-43.508
            L238.848,142.991z" />
        </g>
        </svg>
        <h2 class="font-bold text-2xl text-center mt-5">Тут пусто</h2>
        </div>
        <div v-else>
          <div v-for="product in liked_products" :key="product.id" class="flex flex-row mt-2 items-center border rounded">
          <img :src="product.image" alt="product" class="rounded w-32 justify-self-start" />
          <div class="ml-5 flex flex-col w-1/3">
            <span class="text-lg">{{ product.name }}</span>
            <span v-if="product.discount_percent > 0">
              <span class="line-through decoration-rose-400">{{ product.price }} ₽</span><sup v-if="product.discount_percent > 0" class="text-xs text-rose-400">-{{ product.discount_percent }}%</sup><span class="font-bold ml-2">{{ product.total_price }} ₽</span>
            </span>
            <span v-else>{{ product.total_price }} ₽</span>
          </div>
          <div class="flex">
            <img :src="product.isLiked ? '/like-2.svg' : '/like-1.svg'" alt="like-1" @click="addLike(product.id)" class="w-10 cursor-pointer mr-5" />
            <a class="border border-rose-400 rounded py-2 px-4 text-rose-400 hover:bg-rose-400 hover:text-white hover:cursor-pointer">Заказать</a>
          </div>
        </div>
        </div>
      </div>
    </div>

  </div>
</template>