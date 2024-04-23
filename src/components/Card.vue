<template>
  <div class="bg-zinc-100 rounded-xl p-2 relative select-none">
    <img :src="image_url" alt="Sneakers" class="rounded-lg mb-2 mx-auto" />
    <div id="desc" class="mx-1">
      <p id="price" class="text-lg font-medium pb-1">{{ price }} ₽</p>
      <p id="title" class="pb-1">{{ title }}</p>
      <p id="description" class="text-zinc-400 text-xs pb-14">
        {{ description }}
      </p>
    </div>
    <div id="buttons" class="absolute w-full bottom-0 mb-2 pr-4 text-sm">
      <div v-if="added" class="grid grid-cols-3 gap-2 font-medium items-center">
        <div
          @click="remove()"
          class="p-2 shadow-md rounded-lg bg-white text-center active:shadow-none"
        >
          -
        </div>
        <p class="bg-green-300 rounded-full p-2 w-8 text-center mx-auto">
          {{ counter }}
        </p>
        <div
          @click="add()"
          class="p-2 shadow-md rounded-lg bg-white text-center active:shadow-none"
        >
          +
        </div>
      </div>
      <div
        v-else
        @click="(added = !added), add()"
        class="p-2 shadow-md rounded-lg bg-white text-center font-normal text-sm"
      >
        Добавить
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserCart } from "../stores/userCart.js";

const props = defineProps({
  image_url: String,
  title: String,
  description: String,
  price: Number,
  id: Number,
});

const cart = useUserCart();

const added = ref(false);
const counter = ref(0);

const add = () => {
  counter.value++;
  cart.fullprice += props.price;
  cart.addItem(props, counter.value);
};

const remove = () => {
  counter.value <= 1
    ? ((counter.value = 0), (added.value = false))
    : counter.value--,
    (cart.fullprice -= props.price);
  cart.removeItem(props, counter.value);
};
</script>
