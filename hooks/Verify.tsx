
"use client";
import { useEffect } from "react";
import useAuthStore from "@/zustand/useAuthStore";

export const useSessionCheck = () => {
  const { setAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    console.log("entros");

    const checkAuth = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        console.log("esta es la data  en veryfy", data);
        if (res.ok) {
          setAuthenticated(true);
        } else {
          logout();
        }
      } catch (err) {
        console.log("este es el error ", err);
        logout();
      }
    };

    checkAuth();
  }, [logout, setAuthenticated]);
};
