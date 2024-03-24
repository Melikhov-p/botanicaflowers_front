<script setup>
import { inject, ref } from 'vue'
import axios from 'axios'

const client = inject('client')
const DrawerOpen = inject('DrawerOpen')
DrawerOpen.value = false

const firstName = ref('')
const lastName = ref('')
const phone = ref('')
const password = ref('')
const check_password = ref('')
const email = ref('')
const error_required_fields = ref(false)

const Register = async () => {
  const client_data = {
    'first_name': firstName.value,
    'last_name': lastName.value,
    'phone': phone.value,
    'password': password.value
  }
  if (email.value) {
    client_data['email'] = email.value
  }
  if (firstName.value && lastName.value && phone.value && password.value && check_password.value) {
    axios.post('http://localhost:8000/api/clients/', {
      ...client_data
    }).then(resp => {
      console.log(resp.data)
      localStorage.setItem('token', resp.data.token)
      axios.get('http://localhost:8000/api/clients/', {
        'headers': {
          'Authorization': 'Token ' + resp.data.token
        }
      }).then(resp => client.value = resp.data[0])
    }).then(() => {
      location.replace('/')
    })
  } else {
    error_required_fields.value = true
  }

}
</script>

<template>
  <div class="">
    <div class="flex justify-between">
      <h1 class="text-2xl">Регистрация</h1>
      <h1 v-if="error_required_fields" class="text-xl text-rose-400">Заполнены не все обязательные поля</h1>
    </div>
    <form action="" class="flex justify-center flex-col items-center gap-3 mt-5">
      <input id="first_name" class="border rounded-md py-2 pl-10 pr-4 outline-0 focus:border-gray-400 w-1/2" placeholder="Имя" required v-model="firstName" />
      <input class="border rounded-md py-2 pl-10 pr-4 outline-0 focus:border-gray-400 w-1/2" placeholder="Фамилия" required v-model="lastName" />
      <input class="border rounded-md py-2 pl-10 pr-4 outline-0 focus:border-gray-400 w-1/2" placeholder="Номер телефона" required v-model="phone" />
      <input class="border rounded-md py-2 pl-10 pr-4 outline-0 focus:border-gray-400 w-1/2" placeholder="Пароль" type="password" required v-model="password" />
      <input class="border rounded-md py-2 pl-10 pr-4 outline-0 focus:border-gray-400 w-1/2" placeholder="Подтвердите пароль" type="password" required v-model="check_password" />
      <input class="border rounded-md py-2 pl-10 pr-4 outline-0 focus:border-gray-400 w-1/2" placeholder="E-mail" v-model="email" />
      <button class="border border-rose-400 rounded py-2 px-4 text-rose-400 hover:bg-rose-400 hover:text-white w-1/2" @click="Register">Зарегистрироваться</button>
    </form>
  </div>
</template>

<style scoped>

</style>