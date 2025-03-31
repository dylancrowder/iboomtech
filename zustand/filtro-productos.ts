import { create } from "zustand";

interface FilterState {
  model: string;
  color: string;
  memory: string;
  sortOrder: string;
  category: string;
  condition: string;
  setCategory: (newCategory: string) => void;
  setCondition: (newCondition: string) => void;
  setMemory: (newMemory: string) => void;
  setModel: (newModel: string) => void;
  setColor: (newColor: string) => void;
  setSortOrder: (order: string) => void;
  resetModel: () => void;
  resetMemory: () => void;
  resetColor: () => void;
}

const useFilterStore = create<FilterState>((set) => ({
  category: "",
  model: "",
  memory: "",
  color: "",
  condition: "",
  sortOrder: "", // Default: Menor a Mayor
  setCondition: (newCondition) => set({ condition: newCondition }),
  setCategory: (newCategory) => set({ category: newCategory }),
  setModel: (newModel) => set({ model: newModel }),
  setMemory: (newMemory) => set({ memory: newMemory }), // ← Faltaba esta función
  setColor: (newColor) => set({ color: newColor }),
  setSortOrder: (order) => set({ sortOrder: order }),
  resetModel: () => set({ model: "" }),
  resetMemory: () => set({ memory: "" }),
  resetColor: () => set({ color: "" }),
}));

export default useFilterStore;
