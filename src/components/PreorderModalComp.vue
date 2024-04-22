<script setup>

import { ref } from 'vue'

defineProps({
  product_name: String,
  product_price: Number,
  product_id: Number,
  closePreorderModal: Function,
})

const id_copied = ref(false)

function PreorderTelegram(){
  window.open("https://t.me/botanica_belgorod_bot")
}

function copyToClipboard(product_id){
  navigator.clipboard.writeText("site@" + product_id)
  id_copied.value = true
  setTimeout(() => {  id_copied.value = false }, 2000);
}



</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70" @click="closePreorderModal"></div>
  <div class="bg-white w-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed z-20 p-5">
  <div class="bg-white w-1/3 top-0 left-1/2 -translate-x-1/2 fixed z-30 p-5 text-center text-rose-400" v-if="id_copied">Текст скопирован</div>
    <h2 class="text-3xl font-bold border-b text-center pb-5">Заказ</h2>
    <div class="flex flex-col justify-between h-2/3">
      <p class="text-lg mt-5">Предзаказы оформляются по телефону 8 (930) 086-90-08 или через телеграмм бота по кнопке ниже.</p>
      <p class="text-lg mt-5 self-center">Для заказа "{{product_name}}" отправьте боту </p>
      <span class="text-rose-400 hover:underline hover:cursor-pointer self-center text-xl" @click="copyToClipboard(product_id)">site@{{product_id}}</span>
      <img src="/botanica_bot.jpg" alt="telegram" class="w-1/3 self-center cursor-pointer rounded-3xl mt-5 hover:scale-105 hover:shadow-xl" @click="PreorderTelegram()" />
      <button class="border border-rose-400 rounded py-2 px-4 text-rose-400 hover:bg-rose-400 hover:text-white w-1/2 self-center mt-5" @click="closePreorderModal">закрыть</button>
    </div>
  </div>
</template>

<style scoped>

</style>