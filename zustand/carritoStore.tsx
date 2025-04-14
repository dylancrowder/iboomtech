import { create } from "zustand";

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

export const useCarritoStore = create<CarritoState>((set) => ({
  carrito: [],

  // Función para agregar productos al carrito
  agregarAlCarrito: (producto) =>
    set((state) => {
      const productoExistente = state.carrito.find(
        (p) => p._id === producto._id
      );

      // Si el producto ya existe, aumentar la cantidad
      if (productoExistente) {
        return {
          carrito: state.carrito.map((p) =>
            p._id === producto._id
              ? { ...p, quantity: p.quantity + 1 } // Aumentar la cantidad
              : p
          ),
        };
      }

      // Si el producto no existe, agregarlo al carrito
      return { carrito: [...state.carrito, { ...producto, quantity: 1 }] };
    }),

  // Función para eliminar productos del carrito
  eliminarDelCarrito: (id) =>
    set((state) => {
      const producto = state.carrito.find((p) => p._id === id);

      // Si el producto tiene más de 1 unidad, disminuye la cantidad
      if (producto && producto.quantity > 1) {
        return {
          carrito: state.carrito.map((p) =>
            p._id === id ? { ...p, quantity: p.quantity - 1 } : p
          ),
        };
      }

      // Si la cantidad es 1, eliminar el producto completamente
      return {
        carrito: state.carrito.filter((producto) => producto._id !== id),
      };
    }),

  // Función para vaciar el carrito
  vaciarCarrito: () => set({ carrito: [] }),
}));
