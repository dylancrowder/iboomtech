/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuthStore from "@/zustand/useAuthStore";
import Image from "next/image";
import logo from "../../assets/imagenes/logotipo/LOGO-negro-iboom.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuthenticated } = useAuthStore();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8085/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      setAuthenticated(true);
      window.location.href = "/";
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.16))]">
      <Card className="w-full max-w-md p-8 lg:shadow-xl lg:rounded-xl bg-white lg:border  lg:border-gray-300 lg:hover:shadow-2xl transition-all duration-300 w-[90%]">
        <CardHeader className="flex justify-center items-start flex-col space-y-4 ">
          <Image alt="logo" src={logo} width={180} />
          <CardTitle className="text-center text-2xl font-semibold text-gray-800 ">
            Iniciar sesión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full py-3 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full py-3 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full py-3 px-4 bg-black text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Iniciar sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
