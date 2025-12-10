<script setup lang="ts">
import { loadStripe } from "@stripe/stripe-js";
import { ref, computed } from "vue";

import { asoneArea, asonePath, fetchData } from "../shared/utils";
import { useCartStore } from "../store/cart";
import { useProductStore } from "../store/products";

const cartStore = useCartStore();
const productStore = useProductStore();

const formattedCart = computed(() => cartStore.formattedCart);

const isLoading = ref(false);
const messages = ref([]);

//@ts-ignore
let stripe;
//@ts-ignore
let elements;
let intentedCalled = false;

let callIntent = async (cartStore: any) => {
  if (!productStore.loaded) return;
  if (!intentedCalled) console.log("totala:", parseInt(cartStore.total));

  const { publishableKey } = await fetch(
    `${window.location.origin}/${asonePath}/${asoneArea}/ws/php/public/config.php`
  ).then((res) => res.json());
  stripe = await loadStripe(publishableKey);

  const {
    clientSecret,
    data,
    error: backendError,
  } = await fetchData(
    `${window.location.origin}/${asonePath}/${asoneArea}/ws/php/public/createintent.php`,
    parseInt(cartStore.total)
  );
  intentedCalled = true;
  //console.log("Fetched data:", { clientSecret, data, backendError });

  if (backendError) {
    // @ts-ignore
    messages.value.push(backendError.message);
  }
  //@ts-ignore
  messages.value.push(`Client secret returned.`);

  //@ts-ignore
  elements = stripe.elements({ clientSecret });
  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");
  const linkAuthenticationElement = elements.create("linkAuthentication");
  linkAuthenticationElement.mount("#link-authentication-element");
  isLoading.value = false;
};

const handleSubmit = async () => {
  if (isLoading.value) {
    return;
  }
  //cartStore.clear();

  isLoading.value = true;

  //@ts-ignore
  const { error } = await stripe.confirmPayment({
    //@ts-ignore
    elements,
    confirmParams: {
      // must privide url with https://
      return_url: `${window.location.origin}/`,
    },
  });

  if (error.type === "card_error" || error.type === "validation_error") {
    //@ts-ignore
    messages.value.push(error.message);
  } else {
    //@ts-ignore
    messages.value.push("An unexpected error occured.");
  }

  isLoading.value = false;
};
</script>

<template>
  <div class="row">
    <div class="col-12 col-md-3 mb-1"></div>
    <div class="col-12 col-md-6 mb-1">
      <form id="payment-form" @submit.prevent="handleSubmit">
        <div id="link-authentication-element" />
        <div id="payment-element" />
        <button class="btn btn-primary w-100" id="submit" :disabled="isLoading">
          Pay now
        </button>
        <!-- <sr-messages :messages="messages" /> -->
      </form>
      <div style="display: none">
        {{ callIntent(cartStore) }}
      </div>
    </div>
    <div class="col-12 col-md-3 mb-1"></div>
  </div>
</template>
