"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button"; // Button from ShadCN UI
import { Input } from "@/components/ui/input"; // Input from ShadCN UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Cards from ShadCN UI
import { Label } from "@/components/ui/label";
import { useCarritoStore } from "@/zustand/carritoStore";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/imagenes/logotipo/LOGO-negro-iboom.png";
// Schema for validation
const esquemaPago = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Debe ser un correo válido"),
  direccion: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  telefono: z.string().min(10, "El teléfono debe tener al menos 10 caracteres"),
  novedades: z.boolean(),
  envio: z.enum(["envio", "retiro"]).default("envio"),
  ciudad: z.string().min(2, "Debe especificar una ciudad"),
  metodoPago: z.enum(["mercadopago", "creditcard"]),
});

type FormData = z.infer<typeof esquemaPago>;

const Pagos = () => {
  const { carrito } = useCarritoStore();
  const total = carrito.reduce(
    (acc, producto) => acc + producto.price * producto.quantity,
    0
  );

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
      const response = await fetch(
        "http://localhost:8085/api/payments/create_preference",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, carrito }),
        }
      );

      const result = await response.json();

      if (!response.ok) throw new Error(result.error);

      window.location.href = result.init_point;
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Error al procesar el pago. Intenta de nuevo.");
    }
  };

  return (
    <>
      <div className="flex h-16 border items-center justify-center w-full px-4 md:w-[100%] md:px-0 ">
        <div className="flex items-center  justify-between w-[90%] md:justify-start">
          {/* Logo */}
          <Link href="/" className="mr-4 flex-shrink-0 mb-2">
            <div className="h-8 w-32 md:h-10 md:w-50 flex items-center ">
              <Image src={logo} alt="logo" />
            </div>
          </Link>
        </div>
      </div>
      <div className="flex w-full justify-center items-center ">
        <div className="flex justify-center w-[90%] bg-blue-500 ">
          {/* contacto */}
          <div className="w-[50%]  bg-teal-500">
            {/* Sección de Contacto */}
            <Card className="shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Contacto</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      {...register("email")}
                      className="w-full"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label>
                      Enviarme novedades y ofertas por correo electrónico
                    </Label>
                    <Input
                      type="checkbox"
                      {...register("novedades")}
                      className="w-5 h-5"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Sección de Dirección */}
            <Card className="shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Dirección</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label>Nombre</Label>
                    <Input
                      type="text"
                      {...register("nombre")}
                      className="w-full"
                    />
                    {errors.nombre && (
                      <p className="text-red-500 text-sm">
                        {errors.nombre.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label>Teléfono</Label>
                    <Input
                      type="text"
                      {...register("telefono")}
                      className="w-full"
                    />
                    {errors.telefono && (
                      <p className="text-red-500 text-sm">
                        {errors.telefono.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label>Dirección</Label>
                    <Input
                      type="text"
                      {...register("direccion")}
                      className="w-full"
                    />
                    {errors.direccion && (
                      <p className="text-red-500 text-sm">
                        {errors.direccion.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label>Ciudad</Label>
                    <Input
                      type="text"
                      {...register("ciudad")}
                      className="w-full"
                    />
                    {errors.ciudad && (
                      <p className="text-red-500 text-sm">
                        {errors.ciudad.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label>Forma de entrega</Label>
                    <div className="space-x-4">
                      <label>
                        <Input
                          type="radio"
                          {...register("envio")}
                          value="envio"
                        />{" "}
                        Envío
                      </label>
                      <label>
                        <Input
                          type="radio"
                          {...register("envio")}
                          value="retiro"
                        />{" "}
                        Retiro en tienda
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sección de Métodos de Pago */}
            <Card className="shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Método de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <Label>Selecciona un método de pago</Label>
                  <div className="space-x-4">
                    <label>
                      <Input
                        type="radio"
                        {...register("metodoPago")}
                        value="mercadopago"
                      />
                      Mercado Pago
                    </label>
                    <label>
                      <Input
                        type="radio"
                        {...register("metodoPago")}
                        value="creditcard"
                      />
                      Tarjeta de Crédito
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Todas las transacciones son seguras y están encriptadas.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full mt-4">
              Pagar ${total}
            </Button>
          </div>

          {/* Resumen de Pedido */}
          <div className="w-[50%]  h-screen sticky top-0 bg-burlywood">
            <Card className="shadow-lg rounded-lg h-[100%] ">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                {carrito.length === 0 ? (
                  <p>Tu carrito está vacío.</p>
                ) : (
                  <ul className="space-y-2">
                    {carrito.map((producto) => (
                      <li
                        key={producto._id}
                        className="flex justify-between border-b py-2"
                      >
                        <span>
                          {producto.model} - {producto.memory}GB
                        </span>
                        <span>${producto.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 font-bold text-lg">
                  Total:{" "}
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Pagos;
