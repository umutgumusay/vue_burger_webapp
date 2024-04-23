import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserCart = defineStore("userCart", () => {
  const items = ref({});
  const fullprice = ref(0);
  const show = ref(false);

  const addItem = (prop, value) => {
    items.value[prop.id] = {
      title: prop.title,
      price: prop.price,
      image: prop.image_url,
      count: value,
    };
  };

  const removeItem = (prop, value) => {
    if (value > 0) {
      items.value[prop.id].count = value;
    } else {
      delete items.value[prop.id];
    }
  };

  return {
    items,
    show,
    fullprice,
    addItem,
    removeItem,
  };
});
