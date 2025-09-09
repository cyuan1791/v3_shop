import { defineStore } from "pinia";
import { asoneData } from "@/shared/utils";

const fakeStoreUrl = "https://fakestoreapi.com";

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

export const useProductStore = defineStore({
  id: "products",

  state: (): ProductState => ({
    items: {},
    ids: [],
  }),

  getters: {
    list(): Product[] {
      return this.ids.map((i) => this.items[i]);
    },

    loaded(): boolean {
      return this.ids.length > 0;
    },
  },

  actions: {
    async fetchAll() {
      //console.log("Fetching products...");
      if (this.loaded) return;
      //const jstr = JSON.stringify(asoneData[0]);
      //console.log(`asoneDate: ${jstr})`);
      //const res = await fetch(`${fakeStoreUrl}/products`);
      //const data: Product[] = await res.json();
      const data: Product[] = asoneData;
      this.ids = data.map((product) => {
        this.items[product.id] = product;
        return product.id;
      });
      //console.log(`Fetched ${this.ids.length} products.`);
    },
  },
});
