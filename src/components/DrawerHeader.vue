<script setup>
import { inject, ref } from 'vue'

const { closeDrawer } = inject('profileDrawerActions')

defineProps({
  client: Object
})

const phone = ref('')
const password = ref('')

const AuthClient = inject('AuthClient')
const LogOut = inject('LogOut')


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
      <div class="flex" v-if="client">
        <img alt="account_settings" src="/settings.svg" class=" hover:cursor-pointer hover:scale-105 mr-3" width="32" height="32" title="Настройки"/>
        <img alt="logout" src="/logout.svg" class="cursor-pointer opacity-80 hover:opacity-100 hover:scale-105" @click="LogOut" width="32" height="32" title="Выйти из профиля"/>
      </div>
    </div>
      <div class="flex flex-col items-center" v-if="client">
        <img alt="profile" src="/profile.png" class="w-32 rounded-3xl" />
        <h2 class="font-bold text-2xl">{{ client.first_name }} {{ client.last_name }}</h2>
        <h2 class="text-slate-400 mb-5">{{ client.phone }}</h2>
        <router-link to="/manager"><a class="text-rose-400 hover:cursor-pointer hover:underline border rounded py-2 px-4 border-rose-400" v-if="client.is_stuff=='True'">Кабинет менеджера</a></router-link>
      </div>
    <div v-else class="flex flex-col">
      <input type="text" class="outline-0 border border-rose-400 rounded mt-2.5 h-10 pl-2" placeholder="Номер телефона" v-model="phone" />
      <input type="password" class="outline-0 border border-rose-400 rounded mt-2.5 h-10 pl-2" placeholder="Пароль" v-model="password" />
      <span class="self-center">Нет аккаунта? <router-link to="/registration"><a class="text-rose-400 hover:cursor-pointer hover:underline">Создать</a></router-link></span>
      <div class="border border-rose-400 rounded mt-5 flex items-center justify-center py-5 hover:bg-rose-400 hover:text-white hover:cursor-pointer" @click="AuthClient(phone, password)">
        Войти
      </div>
    </div>
  </div>
</template>