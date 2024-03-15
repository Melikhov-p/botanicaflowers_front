<script setup>
defineProps({
  closeModalContacts: Function
})
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2/3 fixed z-20 p-5">
    <div class="flex flex-col h-full justify-between">
      <div class="flex justify-between">
        <h2 class="text-3xl font-bold">Контакты</h2>
        <svg @click="closeModalContacts" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer opacity-80 hover:opacity-100 hover:scale-105">
          <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB" />
          <path
            d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
            fill="black" />
        </svg>
      </div>
      <div class="flex justify-around">
        <div class="flex items-center gap-2"><img src="/telegram.svg" alt="telegram" class="w-5"><a href="https://t.me/botanica_belgorod" target="_blank" class="text-rose-400 hover:underline">@botanicaflowers</a></div>
        <div class="flex items-center gap-2"><img src="/phone2.svg" alt="telegram" class="w-5">8 (930) 086-90-08</div>
        <div class="flex items-center gap-2"><img src="/vk.svg" alt="telegram" class="w-5"><a href="https://vk.com/botanicaflowers" target="_blank" class="text-rose-400 hover:underline">botanica_belgorod</a></div>
        <div class="flex items-center gap-2"><img src="/mail.svg" alt="telegram" class="w-5"><a href="mailto:botanicaflowers.25@yandex.ru" class="text-rose-400 hover:underline">botanicaflowers.25@yandex.ru</a></div>
      </div>
      <div class="h-2/3">
        <iframe src="https://yandex.ru/map-widget/v1/?ll=36.594560%2C50.594244&mode=poi&poi%5Bpoint%5D=36.593236%2C50.594414&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1336162158&z=17.54" class="w-full h-full" allowfullscreen="true" style="position:relative;"></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>