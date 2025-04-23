import { create } from "zustand";
import { persist } from "zustand/middleware";

// Definir la estructura de un producto
interface Producto {
  _id: string;
  model: string;
  condition: string;
  price: number;
  quantity: number;
  color: string;
  batteryStatus: number;
  memory: number;
  enabled: boolean;
  category: string;
}

// Definir el estado del carrito
interface CarritoState {
  carrito: Producto[];
  agregarAlCarrito: (producto: Producto) => void;
  eliminarDelCarrito: (id: string) => void;
  vaciarCarrito: () => void;
}

export const useCarritoStore = create<CarritoState>()(
  persist(
    (set) => ({
      carrito: [],

      agregarAlCarrito: (producto) =>
        set((state) => {
          const productoExistente = state.carrito.find(
            (p) => p._id === producto._id
          );

          if (productoExistente) {
            return {
              carrito: state.carrito.map((p) =>
                p._id === producto._id
                  ? { ...p, quantity: p.quantity + 1 }
                  : p
              ),
            };
          }

          return { carrito: [...state.carrito, { ...producto, quantity: 1 }] };
        }),

      eliminarDelCarrito: (id) =>
        set((state) => {
          const producto = state.carrito.find((p) => p._id === id);

          if (producto && producto.quantity > 1) {
            return {
              carrito: state.carrito.map((p) =>
                p._id === id ? { ...p, quantity: p.quantity - 1 } : p
              ),
            };
          }

          return {
            carrito: state.carrito.filter((producto) => producto._id !== id),
          };
        }),

      vaciarCarrito: () => set({ carrito: [] }),
    }),
    {
      name: "carrito-storage", // nombre de la clave en localStorage
    }
  )
);
