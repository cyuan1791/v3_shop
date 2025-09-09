<script setup lang="ts">
import { computed } from 'vue'
import CartCard from '../components/CartCard.vue'
import CartCardSkeleton from '../components/CartCardSkeleton.vue'
import { useCartStore } from '../store/cart'
import { useProductStore } from '../store/products'
import { useRouter } from 'vue-router';
import { toCurrency, asoneArea, asonePath, fetchData } from '../shared/utils'


const router = useRouter();



const cartStore = useCartStore()
const productStore = useProductStore()

const formattedCart = computed(() => cartStore.formattedCart)

const handleClick = () => {
  console.log('Button clicked!, cartStore.total:', cartStore.total);
  //cartStore.clear();
  router.push(`checkout`);
};

</script>

<template>
  <div class="row" v-if="!productStore.loaded">
    <CartCardSkeleton v-for="n in 15" :key="n" />
  </div>
  <div v-else-if="!formattedCart.length">
    <div class="alert alert-primary" role="alert">
      Cart is empty.
    </div>

  </div>
  <div v-else class="row">
    <CartCard v-for="(cartProduct, index) in formattedCart" :key="index" :cart-product="cartProduct" />
    <div class="col-sm-12 col-md-3 mb-1"></div>


    <div class="col-sm-12 col-md-6 mb-1">
      <hr />
    </div>
    <div class="col-sm-12 col-md-3 mb-1"></div>
    <div class="col-sm-12 col-md-5 mb-1"></div>


    <div class="col-sm-12 col-md-2 mb-1"> Total: {{ toCurrency(cartStore.total) }}
    </div>
    <div class="col-sm-12 col-md-2 mb-1">

      <a @click="handleClick" class="btn btn-primary  float-right">Checkout</a>
    </div>

    <div class="col-sm-12 col-md-3 mb-1"></div>

  </div>
</template>
