<template>
  <div class="h-full w-full p-5">
    <div class="grid grid-cols-3 gap-5">
      <router-link to="/manage_goods">
        <a>
          <div class="border border-rose-400 rounded py-2 px-4 text-rose-400 hover:bg-rose-400 hover:text-white cursor-pointer flex items-center w-full">
            <img src="/flowers.svg" alt="flower" width="64" height="64" />
            <span class="ml-3">Управление Товарами</span>
          </div>
        </a>
      </router-link>
      <a>
        <div class="border border-rose-400 rounded py-2 px-4 text-rose-400 hover:bg-rose-400 hover:text-white cursor-pointer flex items-center w-full">
          <img src="/profiles.svg" alt="flower" width="64" height="64" />
          <span class="ml-3">Управление Клиентами</span>
        </div>
      </a>
      <a>
        <div class="border border-rose-400 rounded py-2 px-4 text-rose-400 hover:bg-rose-400 hover:text-white cursor-pointer flex items-center w-full">
          <img src="/manager_orders.svg" alt="flower" width="64" height="64" />
          <span class="ml-3">Управление Заказами</span>
        </div>
      </a>
    </div>
  </div>
</template>
<script setup>
</script>