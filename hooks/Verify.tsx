/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
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

        if (res.ok) {
          setAuthenticated(true);
        } else {
          logout();
        }
      } catch (err) {
        logout();
      }
    };

    checkAuth();
  }, [logout, setAuthenticated]);
};
