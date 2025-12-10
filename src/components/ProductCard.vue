<script setup lang="ts">
import { useCartStore } from "@/store/cart";
import type { Product } from "@/store/products";
import { toCurrency } from "@/shared/utils";

defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();
</script>

<template>
  <div class="col-sm-12 col-md-4 p-4">
    <div class="card h-100">
      <img
        v-if="product.image"
        :src="product.image"
        alt="Card Image"
        class="card-img-top object-contain w-full h-64"
      />

      <div
        class="card-img-top"
        v-else-if="product.svg"
        v-html="product.svg"
      ></div>

      <div class="card-body">
        <h2 class="card-title">
          <router-link class="link link-hover" :to="`/product/${product.id}`">
            {{ product.title }}
          </router-link>
        </h2>
        <p v-text="product.description" />

        <p>{{ toCurrency(product.price) }}</p>
        <div class="justify-end card-actions">
          <button
            v-if="product.price > 0"
            class="btn btn-primary"
            @click="cartStore.add(product.id)"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="card bordered ">
    <figure class="px-8 pt-10">
      <img :src="product.image" alt="Card Image" class="object-contain w-full h-64">
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        <router-link class="link link-hover" :to="`/product/${product.id}`">
          {{ product.title }}
        </router-link>
      </h2>
      <p>{{ toCurrency(product.price) }}</p>
      <div class="justify-end card-actions">
        <button v-if="product.price > 0" class="btn btn-primary" @click="cartStore.add(product.id)">
          Add to Cart
        </button>
      </div>
    </div>
  </div> -->
</template>
