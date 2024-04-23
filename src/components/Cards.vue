<template>
  <Cart v-show="cart.show" />
  <div class="grid grid-cols-2 gap-4 mb-4" id="cards">
    <Card
      v-for="item in items"
      :image_url="item.imageUrl"
      :title="item.title"
      :description="item.description"
      :price="item.price"
      :id="item.id"
    />
  </div>
</template>

<script setup>
import Card from "./Card.vue";
import Cart from "./Cart.vue";
import { useUserCart } from "../stores/userCart";
import items from "../stores/items.json";

const cart = useUserCart();
</script>
