<script setup>

defineProps({
  closeProductDetailModal: Function,
  product_name: String,
  product_price: Number,
  product_id: Number,
  product_description: String,
  product_image_url: String
})
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70" @click="closeProductDetailModal"></div>
  <div class="bg-white w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed z-20 p-5 flex">
    <div class="w-1/3">
      <img :src="product_image_url"/>
    </div>
    <div class="w-2/3 ml-10 flex flex-col justify-between">
      <div class="flex items-center">
        <p class="text-2xl font-bold font-sans">{{ product_name }}</p>
        <p class="ml-10 text-rose-400 text-xl">{{product_price}} ₽</p>
      </div>
      <div class="">
        <p>{{ product_description }}</p>
      </div>
      <div>
        <a class="text-rose-400 hover:cursor-pointer hover:text-white hover:bg-rose-400 border rounded py-2 px-4 border-rose-400" @click="closeProductDetailModal">Закрыть</a>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>