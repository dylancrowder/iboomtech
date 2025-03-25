"use client";

import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useCarritoStore } from "@/zustand/carritoStore";

const esquemaPago = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Debe ser un correo válido"),
  direccion: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
});

type FormData = z.infer<typeof esquemaPago>;

const Pagos = () => {
  const { carrito } = useCarritoStore();
  const total = carrito.reduce((acc, producto) => acc + producto.price * producto.quantity, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(esquemaPago),
  });

  const onSubmit = async (data: FormData) => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío. Agrega productos para continuar.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8085/api/payments/create_preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, carrito }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error);

      window.location.href = result.init_point;
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Error al procesar el pago. Intenta de nuevo.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Finalizar Compra</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label>Nombre completo</Label>
                <Input type="text" {...register("nombre")} />
                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
              </div>
              <div>
                <Label>Correo electrónico</Label>
                <Input type="email" {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div>
                <Label>Dirección de envío</Label>
                <Input type="text" {...register("direccion")} />
                {errors.direccion && <p className="text-red-500 text-sm">{errors.direccion.message}</p>}
              </div>
              <Button type="submit" className="w-full">Pagar ${total}</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productos en el Carrito</CardTitle>
          </CardHeader>
          <CardContent>
            {carrito.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              <ul className="space-y-2">
                {carrito.map((producto) => (
                  <li key={producto._id} className="flex justify-between border-b py-2">
                    <span>{producto.model} - {producto.memory}GB</span>
                    <span>${producto.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 font-bold text-lg">Total: <span className="text-green-600">${total}</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pagos;
