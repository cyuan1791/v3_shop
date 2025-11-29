import { onUnmounted } from "vue";
import { useCartStore } from "@/store/cart";
import { asonePath } from "@/shared/utils";

export const CART_STORAGE = "CART_STORAGE" + asonePath;

export function usePersistCart() {
  const cartStore = useCartStore();

  const unsub = cartStore.$subscribe(() => {
    localStorage.setItem(CART_STORAGE, JSON.stringify(cartStore.contents));
  });

  onUnmounted(() => {
    unsub();
  });
}
