<script setup>
import Cards from "./components/Cards.vue";
import WebApp from "@twa-dev/sdk";

WebApp.expand();
</script>

<template>
  <div class="p-4 bg-white">
    <Cards />
  </div>
</template>

<style scoped></style>
