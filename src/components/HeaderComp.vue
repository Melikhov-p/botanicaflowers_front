<script setup>
const emit = defineEmits(['openDrawer']);


</script>

<template>
  <div class="bg-white w-4/5 m-auto rounded shadow-xl mt-10">
    <header class="flex justify-between border-b border-slate-200 p-5">

      <div class="flex items-center gap-2">
        <img alt="logo" src="/logo.png" class="w-10" />
        <div>
          <h2 class="text-xl font-bold">BOTANICA FLOWERS<sup class="font-light text-rose-700 text-xs px-0.5" >beta</sup></h2>
          <p class="text-slate-300">Цветочная мастерская</p>
        </div>
      </div>

      <ul class="flex items-center gap-5">
        <li class="flex items-center gap-1 text-zinc-500 hover:text-zinc-800 cursor-pointer">
          <img alt="heart" src="/heart.svg" />
          <span>Понравилось</span>
        </li>
        <li @click="emit('openDrawer')" class="flex items-center gap-1 text-zinc-500 hover:text-zinc-800 cursor-pointer">
          <img alt="cart" src="/profile.svg" />
          <span>Профиль</span>
        </li>
      </ul>
    </header>
  </div>
</template>