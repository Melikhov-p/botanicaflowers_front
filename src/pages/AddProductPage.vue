<script setup>

import { Cropper } from 'vue-advanced-cropper'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const product = ref({})
const product_image_url = ref('')
const total_price = ref(0)
const categories = ref([])

product_image_url.value = '/package-icon.png'
product.value.discount_percent = 0
product.value.amount = 1
product.value.available = true

function ChangeTotalPrice() {
  total_price.value = product.value.price - ((product.value.price * product.value.discount_percent) / 100)
}

function ChangeProductImage(event) {
  product.value.image = event.target.files[0]
  product_image_url.value = URL.createObjectURL(event.target.files[0])
  console.log(event)
}

function CropImage({ coordinates, canvas }) {
  coordinates.value = coordinates
  product.value.image = canvas.toDataURL()
}

function getCategories() {
  axios.get('http://localhost:8000/api/category/', {}).then(
    resp => {
      categories.value = resp.data
      console.log(categories.value)
    }
  )
}

function AddProduct(){
  axios.post('http://localhost:8000/api/products/',
    {
      name: product.value.name,
      description: product.value.description,
      image: product.value.image,
      price: Number(product.value.price),
      discount_percent: Number(product.value.discount_percent),
      amount: Number(product.value.amount),
      available: product.value.available,
      category: product.value.category
    }, {
      'headers': {
        'Authorization': 'Token ' + localStorage.getItem('token'),
      }
    }).then(
    resp => {
      if (resp.status === 201) {
        alert('Товар добавлен')
        location.href = '/manage_goods'
      }
      else {
        alert('Произошла ошибка' + resp.data)
      }
    }
  )
}

onMounted(
  getCategories,
)
</script>

<template>
<div class="flex flex-row w-full">
    <div class="w-1/3">
      <!--      <img :src="product.image" alt="product-image" />-->
      <cropper
        class="cropper"
        :src="product_image_url"
        @change="CropImage"
        :min-height="796"
        :min-width="796"
        :stencil-props="{
          aspectRatio: 1/1
        }"
      ></cropper>
      <div class="mt-3 flex justify-center w-full">
        <label for="image" class="border border-rose-400 rounded py-2 px-4 text-rose-400 hover:bg-rose-400 hover:text-white">Изменить изображение</label>
        <input type="file" class="hidden" ref="image" id="image" @change="ChangeProductImage" />
      </div>
    </div>
    <div class="w-2/3 ml-10">
      <div class="flex flex-col flex-start gap-10 h-full">
        <div class="flex items-center justify-between">
          <div class="w-2/3">
            <input type="text" placeholder="Наименование" class="w-64 border rounded-md py-2 px-2 outline-0 focus:border-gray-700" v-model="product.name" />
            <input type="checkbox" class="ml-10" v-model="product.available" /><span class="ml-2 mr-32">В наличии</span>
            <select class="w-64 border rounded-md py-2 px-2 outline-0 focus:border-gray-700" v-model="product.category">
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
          </div>
          <div class="w-1/3 flex justify-end">
            <router-link to="/manage_goods">
              <a class="text-rose-400 hover:cursor-pointer hover:text-white hover:bg-rose-400 border rounded py-2 px-4 border-rose-400">
                Назад
              </a>
            </router-link>
          </div>
        </div>
        <textarea type="text" placeholder="Описание" class="border rounded-md py-2 px-2 outline-0 focus:border-gray-700" v-model="product.description" />
        <div class="flex items-center">
          <span class="mr-2">Цена:</span><input type="text" placeholder="Цена" class="w-1/3 border rounded-md py-2 px-2 outline-0 focus:border-gray-700" v-model="product.price" @input="ChangeTotalPrice" />
          <span class="ml-5 mr-2">Скидка:</span><input type="text" placeholder="Скидка" class="w-32 border rounded-md py-2 px-2 outline-0 focus:border-gray-700 mr-2" v-model="product.discount_percent" @input="ChangeTotalPrice" /><span class="text-2xl font-bold">%</span>
          <span class="ml-10 text-rose-400 text-2xl font-bold">{{ total_price }}</span>
        </div>
        <div>
          <span class="mr-2">Количество:</span><input type="text" placeholder="Количество" class="w-1/3 border rounded-md py-2 px-2 outline-0 focus:border-gray-700" v-model="product.amount" />
        </div>
        <button class="border border-rose-400 rounded py-2 px-4 text-rose-400 hover:bg-rose-400 hover:text-white" @click="AddProduct">Добавить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>