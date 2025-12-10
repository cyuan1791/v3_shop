<script setup lang="ts">
import { computed } from "vue";
import Search from "./Search.vue";
import { useCartStore } from "@/store/cart";

const cartStore = useCartStore();

const count = computed(() => cartStore.count);
</script>

<template>
  <div class="d-flex justify-content-center">
    <div
      class="btn-group m-4 p-3 w-100 bg-success-subtle"
      role="group"
      aria-label="Basic mixed styles example"
    >
      <router-link class="btn btn-ghost rounded-btn" to="/">
        <span class="btn btn-outline-dark"> Shop </span>
      </router-link>
      <router-link class="btn rounded-btn" to="/cart">
        <span class="btn btn-outline-danger text-center">
          <span class="fas fa-shopping-cart"></span> &nbsp;
          <div class="badge text-bg-secondary" v-text="count" />
        </span>
      </router-link>
      <router-link class="btn btn-ghost rounded-btn" to="/about">
        <span class="btn btn-outline-info"> About </span>
      </router-link>
    </div>
  </div>
  <div class="d-flex justify-content-center">
    <Search />
  </div>
</template>
