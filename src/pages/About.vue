<script setup lang="ts">
import { ref } from "vue";
import { asoneDataHTML } from "@/shared/utils";

const AboutPage = ref("");

if (asoneDataHTML.About) {
  AboutPage.value = asoneDataHTML.About.tcode;
}
</script>

<template>
  <div v-if="AboutPage" v-html="AboutPage"></div>
</template>
