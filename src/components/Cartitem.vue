<template>
  <div class="flex justify-between py-2 items-center">
    <div class="flex items-center">
      <img :src="image_url" alt="Image" class="h-16 rounded-md" />
      <div class="mx-2 text-sm">
        <p>{{ title }}</p>
        <p class="text-zinc-400">{{ value }} шт.</p>
      </div>
    </div>
    <div class="flex justify-between px-2">
      <b>{{ price * value }}&nbsp</b>
      <b>₽</b>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  image_url: String,
  title: String,
  value: Number,
  price: Number,
});
</script>
