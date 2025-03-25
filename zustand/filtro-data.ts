import { create } from "zustand";

interface ProductStore {
  products: any[];
  models: string[];
  colors: string[];
  memories: string[];
  setProductsData: (products: any[]) => void;
}

export const useProductStores = create<ProductStore>((set) => ({
  products: [],
  models: [],
  colors: [],
  memories: [],
  setProductsData: (products) => {
    // Extraer dinámicamente los modelos, colores y memorias
    const models = Array.from(new Set(products.map((p) => p.model)));
    const colors = Array.from(new Set(products.map((p) => p.color)));
    const memories = Array.from(new Set(products.map((p) => p.memory)));

    set({ products, models, colors, memories });
  },
}));
