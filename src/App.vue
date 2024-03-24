<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import axios from 'axios'
import { onMounted, provide, ref} from 'vue'
import ModalContactsComp from '@/components/ModalContactsComp.vue'
import HomePage from '@/pages/HomePage.vue'
import PreorderModal from '@/components/PreorderModalComp.vue'


const DrawerOpen = ref(false)
const ModalContacts = ref(false)

const closeDrawer = () => {
  DrawerOpen.value = false
}
const openDrawer = () => {
  DrawerOpen.value = true
}
const openModalContacts = () => {
  ModalContacts.value = true
}
const closeModalContacts = () => {
  ModalContacts.value = false
}

const client = ref(null)

function getClient() {
  if (localStorage.getItem('token')) {
    console.log('loading local client')
    axios.get('http://localhost:8000/api/clients/', {
      'headers': {
        'Authorization': 'Token ' + localStorage.getItem('token')
      }
    }).then(resp => {
      if ('error' in resp.data) {
        localStorage.removeItem('token')
        console.log(resp.data)
      } else {
        client.value = resp.data[0]
      }
    }).catch(function(error) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        console.log('token expired')
      }
    })
  }
  else{
    console.log('no token')
  }
}

function AuthClient(phone, password) {
  let token = localStorage.getItem('token')
  if (token) {
    console.log(token)
    axios.get('http://localhost:8000/api/clients/', {
      'headers': {
        'Authorization': 'Token ' + token
      }
    }).then(resp => client.value = resp.data[0])
    location.reload()
  } else {
    console.log('no token')
    console.log({ 'username': phone, 'password': password })
    axios.post('http://localhost:8000/api/login/', { 'username': phone, 'password': password }).then(resp => {
      token = resp.data.token
      localStorage.setItem('token', token)
      axios.get('http://localhost:8000/api/clients/', {
        'headers': {
          'Authorization': 'Token ' + token
        }
      }).then(resp => {
        client.value = resp.data[0]
        location.reload()
      })
    }).catch(function(error) {
        if (error.response.status === 400) {
          if (error.response.data.error === 'Invalid credentials'){
            alert('Неправильный номер телефона или пароль')
          }
        }
      })
  }
}

const LogOut = () => {
  localStorage.removeItem('token')
  DrawerOpen.value = false
  client.value = null
  console.log('LogOut')
  location.reload()
}

onMounted(async () => {  // При монтировании (загрузке страницы)
  getClient()
})

provide('profileDrawerActions', {
  closeDrawer,
  openDrawer
})
provide('AuthClient', AuthClient)
provide('LogOut', LogOut)
provide('client', client)
provide('DrawerOpen', DrawerOpen)
</script>

<template>
  <div class="h-screen">

    <ModalContactsComp :close-modal-contacts="closeModalContacts" v-if="ModalContacts"/>

    <HeaderComp @open-drawer="openDrawer" :open-modal-contacts="openModalContacts"/>

    <div class="bg-white w-4/5 m-auto rounded shadow-xl my-5 p-5">
      <RouterView/>
    </div>

    <div>
      <a href="#" title="Вернуться к началу страницы" class="transition fixed bottom-5 left-10">
        <img src="/up.svg" alt="up" class="w-10 opacity-25" />
      </a>
    </div>

    <div class="bg-white w-4/5 m-auto shadow-xl my-5 p-5 flex justify-between items-center">
      <div>
        <p class="text-slate-800 font-light">ИП ФЕДЧЕНКО ЭЛИНА ИГОРЕВНА</p>
        <p class="text-slate-800 font-light">ОГРНИП 323310000078371</p>
        <p class="text-slate-800 font-light">ИНН 312342666634</p>
      </div>
      <div>
        <p class="font-light text-slate-800">BOTANICA©2024</p>
      </div>
      <div>
        <p class="font-light text-slate-800">+7 (930) 086-90-08</p>
        <p class="font-light text-slate-800">botanicaflowers.25@yandex.ru</p>
        <p class="font-light text-slate-800">Гражданский проспект 47, Белгород</p>
      </div>
    </div>
  </div>
</template>

<style>
</style>
