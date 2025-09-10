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
  <!-- use vue3 and bootstrap 4 to create a blogpost. The post data is read from a json file. The main page display the title, data, author, image, summary and a read more link to read the content
  -->
  <Nav />

  <router-view v-slot="slotProps">
    <transition name="fade" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>
<style lang="css">
.fade-enter-from,
.fade-button-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
