<script setup lang="ts">
import { computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import ProductCardSkeleton from '@/components/ProductCardSkeleton.vue'
import { useProductStore } from '@/store/products'
import { useRouter } from 'vue-router';

const router = useRouter();

setTimeout(() => {
  const r = router.push(`/`);
}, 2000);


const productStore = useProductStore()

const products = computed(() => productStore.list)

</script>

<template>
  <div class="row">
    <ProductCardSkeleton v-for="n in 15" v-show="!productStore.loaded" :key="n" />
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>
