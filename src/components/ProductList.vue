<script setup>
import ProductCard from '@/components/ProductCard.vue'
defineProps({
  products: Array,
})
</script>
<template>
      <div class="grid grid-cols-4 gap-5 mt-8">
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
          :on-click-like="onClickLike"/>

      </div>

</template>