<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import type { CartPreview } from '@/store/cart'
import { toCurrency } from '@/shared/utils'

defineProps<{
  cartProduct: CartPreview
}>()

const cartStore = useCartStore()
</script>

<template>
  <div class="col-12 col-md-3 mb-1"></div>
  <div class="col-12 col-md-3 mb-1">


    <img v-if="cartProduct.image" :src="cartProduct.image" alt="Card Image"
      class="card-img-top object-contain w-full h-64">

    <div class="card-img-top" v-else-if="cartProduct.svg" v-html="cartProduct.svg"></div>

  </div>
  <div class="col-12 col-md-3 mb-1">
    <div class=" card-body">
      <div class="p-3 mx-auto" style="display: flex; justify-content: center; align-items: center; max-width: 800px;">
        <div>
          <h5 class="card-title">
            <router-link class="link link-hover" :to="`/product/${cartProduct.id}`">
              {{ cartProduct.title }}
            </router-link>
          </h5>
          <p>{{ toCurrency(cartProduct.cost) }}</p>
          <div class="card-actions">
            <div class="btn-group">
              <button class="btn btn-primary btn-sm" @click="cartStore.remove(cartProduct.id)">
                -
              </button>
              <button class="btn btn-ghost no-animation">
                {{ cartProduct.quantity }}
              </button>
              <button class="btn btn-primary btn-sm" @click="cartStore.add(cartProduct.id)">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-3 mb-1"></div>
</template>
