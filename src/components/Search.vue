<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/store/products'

const productStore = useProductStore()
const router = useRouter()
const input = ref('')

const searchResults = computed(() => {
  if (!input.value || input.value.length < 2)
    return []

  return productStore.list.filter((item) => {
    return item.title.toLowerCase().includes(input.value.toLowerCase())
  })
})

function navigate(id: number) {
  input.value = ''
  router.push(`/product/${id}`)
}
</script>

<template>

  <div class="d-flex justify-content-center p-2" style="z-index: 1000;max-height: 60px;">
    <ul>
      <li>
        <input class="btn btn-outline-success" v-model="input" type="text" placeholder="Search..."
          :disabled="!productStore.loaded">
      </li>
      <li v-for="product in searchResults" :key="product.id">&nbsp;&nbsp;
        <a class="bg-light m-2" href="#" @click.prevent="navigate(product.id)" v-text="product.title" />
      </li>
    </ul>
  </div>

  <!-- <div class="dropdown dropdown-end">
    <div class="form-control">
      <input v-model="input" type="text" placeholder="Search..." class="input input-ghost" :disabled="!productStore.loaded">
    </div>
    <ul class="shadow menu dropdown-content bg-base-100 rounded-box w-64 text-base-content overflow-y-scroll" style="max-height: 50vh;">
      <li v-for="product in searchResults" :key="product.id">
        <a href="#" @click.prevent="navigate(product.id)" v-text="product.title" />
      </li>
    </ul>
  </div> -->
</template>
<style>
ul {
  list-style-type: none;
}

ul li a:hover {
  color: red;
}

ul li a {
  text-decoration: none;
  color: black;
  padding: 8px 15px;
}
</style>
