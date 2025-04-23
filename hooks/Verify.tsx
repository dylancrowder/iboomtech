"use client";
import { useEffect } from "react";
import useAuthStore from "@/zustand/useAuthStore";

export const useSessionCheck = () => {
  const { setAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        logout();
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        console.log("esta es la data en verify", data);

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
