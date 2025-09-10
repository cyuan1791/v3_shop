import { defineStore } from "pinia";
import { asoneData } from "@/shared/utils";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  svg: string;
}

interface ProductState {
  items: Record<string, Product>;
  ids: number[];
}
console.log("asoneData", asoneData);
const data: Product[] = asoneData;
var items: Record<string, Product> = {};
var ids = data.map((product) => {
  items[product.id] = product;
  return product.id;
});
console.log("items", items);
console.log("ids", ids);

export const useProductStore = defineStore("products", {
  state: (): ProductState => ({
    items: items,
    ids: ids,
  }),

  getters: {
    list(): Product[] {
      return this.ids.map((i) => this.items[i]);
    },

    loaded(): boolean {
      return this.ids.length > 0;
    },
  },
});
