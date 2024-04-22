<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Cropper } from 'vue-advanced-cropper'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const product_id = route.params.id
const product_image_url = ref('')
const product = ref({})
const product_catched = ref(false)
let total_price = ref(0)

function getProduct() {  // Запрос всех товаров
  try {
    axios.get(`http://localhost:8000/api/products/` + product_id, {}).then(
      resp => {
        product.value = resp.data
        total_price.value = resp.data.total_price
        product_image_url.value = resp.data.image
        product_catched.value = true
      }
    )
  } catch (e) {
    console.log(e)
  }
}

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

function SaveProduct() {
  axios.patch('http://localhost:8000/api/products/' + product_id + '/',
    product.value, {
      'headers': {
        'Authorization': 'Token ' + localStorage.getItem('token'), //localStorage.getItem('token')
        'Content-Type': 'multipart/form-data'
      }
    }).then(
    resp => {
      if (resp.status === 200) {
        alert('Товар изменен')
        getProduct()
      } else {
        alert('Произошла ошибка')
        console.log(resp)
      }
    }
  )
}

onMounted(
  async () => {
    await getProduct()
  }
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
        <button class="border border-rose-400 rounded py-2 px-4 text-rose-400 hover:bg-rose-400 hover:text-white" @click="SaveProduct">Сохранить</button>
      </div>
    </div>
  </div>
  <div class="mt-10 flex items-center flex-col">
    <h1 class="text-3xl font-bold">Карточка товара:</h1>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-5">
      <div class="col-start-2">
        <ProductCard v-if="product_catched"
                     :id="product.id"
                     :image-url="product.image"
                     :name="product.name"
                     :category="product.category"
                     :price="Number(product.price)"
                     :discount="Number(product.discount_percent)"
                     :total_price="Number(total_price)"
                     :is-liked=false />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>