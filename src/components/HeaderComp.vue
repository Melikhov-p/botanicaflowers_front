<script setup>
const emit = defineEmits(['openDrawer'])
defineProps({
  openModalContacts: Function
})

</script>

<template>
  <div class="bg-white w-4/5 m-auto rounded shadow-xl mt-10">
    <header class="flex justify-between border-b border-slate-200 p-5 flex-col sm:flex-row items-center gap-5 sm:gap-0">


        <div class="flex flex-col sm:flex-row">
          <router-link to="/">
          <div class="flex items-center sm:border-r-slate-400 sm:border-r lg:pr-5 pb-5 sm:pb-0">
            <img alt="logo" src="/logo.png" class="w-20" />
            <div>
              <h2 class="text-xl font-bold">BOTANICA FLOWERS<sup class="font-light text-rose-700 text-xs px-0.5">beta</sup></h2>
              <p class="text-slate-300">Цветочная мастерская</p>
            </div>
          </div>
          </router-link>
          <div class="ml-5 flex flex-col sm:visible">
            <p class="text-slate-300">Белгород, Гражданский просп., 47</p>
            <p class="text-slate-300">Пн-Вс: 9:00-19:00 | Доставка 24/7</p>
            <p class="text-slate-300">+7 (930) 086-90-08</p>
          </div>
        </div>

      <ul class="flex items-center gap-5">
        <li @click="openModalContacts" class="flex items-center gap-1 text-zinc-500 hover:text-zinc-800 cursor-pointer">
          <img alt="heart" src="/phone.svg" class="w-6" />
          <span>Контакты</span>
        </li>
        <li @click="emit('openDrawer')" class="flex items-center gap-1 text-zinc-500 hover:text-zinc-800 cursor-pointer">
          <img alt="cart" src="/profile.svg" />
          <span>Профиль</span>
        </li>
      </ul>
    </header>
  </div>
</template>