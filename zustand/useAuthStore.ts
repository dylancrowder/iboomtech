import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  userInfo: { name: string; role: string } | null;
  setAuthenticated: (authStatus: boolean) => void;
  setUserInfo: (info: { name: string; role: string }) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userInfo: null,
      setAuthenticated: (authStatus) => set({ isAuthenticated: authStatus }),
      setUserInfo: (info) => set({ userInfo: info }),
    }),
    {
      name: "auth-storage", // Nombre de la clave en localStorage
      storage: createJSONStorage(() => localStorage), // Cambia a sessionStorage si prefieres
    }
  )
);

export default useAuthStore;
