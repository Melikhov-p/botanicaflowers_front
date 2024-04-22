<script setup>
import ProductCard from '@/components/ProductCard.vue'
defineProps({
  products: Array,
})
</script>
<template>
      <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mt-8" v-auto-animate>
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :id="product.id"
          :image-url="product.image"
          :name="product.name"
          :category="product.category"
          :price="product.price"
          :discount="product.discount_percent"
          :total_price="product.total_price"
          :is-liked="product.isLiked"
          :description="product.description"
          />

      </div>

</template>