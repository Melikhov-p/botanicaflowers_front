<script setup>
import { inject, ref } from 'vue'

const { closeDrawer } = inject('profileDrawerActions')

defineProps({
  client: Object,
  login: Function,
  logout: Function
})

const phone = ref('')
const password = ref('')
</script>

<template>
  <div class="">
    <div class="flex justify-between">
      <svg @click="closeDrawer" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer opacity-80 hover:opacity-100 hover:scale-105">
        <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB" />
        <path
          d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
          fill="black" />
      </svg>
      <div class="cursor-pointer opacity-80 hover:opacity-100 hover:scale-105" v-if="client">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" title="Выйти из профиля" @click="logout">
          <path
            d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17"
            stroke="#4d4d4d" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#f3646e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
    <div class="flex flex-col items-center" v-if="client">
      <img alt="profile" src="/profile.png" class="w-32 rounded-3xl" />
      <h2 class="font-bold text-2xl">{{ client.first_name }} {{ client.last_name }}</h2>
      <h2 class="text-slate-400">{{ client.phone }}</h2>
    </div>
    <div v-else class="flex flex-col">
      <input type="text" class="outline-0 border border-rose-400 rounded mt-2.5 h-10 pl-2" placeholder="Номер телефона" v-model="phone"/>
      <input type="password" class="outline-0 border border-rose-400 rounded mt-2.5 h-10 pl-2" placeholder="Пароль" v-model="password"/>
      <span class="self-center">Нет аккаунта? <a class="text-rose-400 hover:cursor-pointer hover:underline">Создать</a></span>
      <div class="border border-rose-400 rounded mt-5 flex items-center justify-center py-5 hover:bg-rose-400 hover:text-white hover:cursor-pointer" @click="login(phone, password)">
        Войти
      </div>
    </div>
  </div>
</template>