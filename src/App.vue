<script setup lang="ts">
import { computed } from 'vue'
import Nav from './components/Nav.vue'
import { usePersistCart } from './composables/usePersistCart'
import { useCartStore } from './store/cart'
import { useProductStore } from './store/products'

const productStore = useProductStore()
const cartStore = useCartStore()

//productStore.fetchAll()
usePersistCart()

const count = computed(() => cartStore.count)
</script>

<template>

  <Nav />
  <router-view />


</template>
