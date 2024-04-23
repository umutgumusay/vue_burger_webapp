<template>
  <div
    class="fixed top-0 left-0 h-full w-full bg-white z-10 overflow-scroll select-none"
  >
    <div class="flex justify-end m-2">
      <p
        @click="cart.show = !cart.show"
        class="px-2 active:opacity-30 text-base text-amber-500"
      >
        Изменить
      </p>
    </div>
    <div class="bg-zinc-100 px-2">
      <Cartitem
        v-for="item in cart.items"
        :image_url="item.image"
        :title="item.title"
        :value="item.count"
        :price="item.price"
      />
    </div>
    <div class="flex m-4 text-xl font-semibold">
      <p>Итого:&nbsp</p>
      <p>{{ cart.fullprice }} ₽</p>
    </div>
  </div>
</template>

<script setup>
import Cartitem from "./Cartitem.vue";
import { useUserCart } from "../stores/userCart";
import { watchEffect } from "vue";
import WebApp from "@twa-dev/sdk";

const cart = useUserCart();

watchEffect(() => {
  if (cart.show) {
    document.body.style.overflowY = "hidden";

    WebApp.MainButton.setParams({
      color: "#3bb94f", // Cart green
      text: "ОФОРМИТЬ ЗАКАЗ",
    });

    WebApp.BackButton.show();
  } else {
    document.body.style.overflowY = "";

    WebApp.MainButton.setParams({
      color: "#5390c1", // Cards blue
      text: "КОРЗИНА",
    });

    WebApp.BackButton.hide();
  }

  if (cart.fullprice > 0) {
    WebApp.MainButton.show();
    WebApp.enableClosingConfirmation();
  } else {
    WebApp.MainButton.hide();
    WebApp.disableClosingConfirmation();
  }
});

WebApp.BackButton.onClick(() => {
  cart.show = !cart.show;
});

WebApp.MainButton.onClick(() => {
  if (!cart.show) {
    cart.show = !cart.show;
  } else {
    WebApp.showConfirm("Подтвердить оформление заказа?", (confirmed) => {
      if (confirmed) {
        let data = "";
        for (let key in cart.items) {
          data += `<b>${cart.items[key].count} шт.</b> ${cart.items[key].title}\n`;
        }
        data += `\n<b>Сумма:</b> ${cart.fullprice}`;
        WebApp.sendData(data);
      }
    });
  }
});
</script>
