/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface ProductoDetallado {
  _id: string;
  title: string;
  price: number;
  batteryStatus?: number;
  memory?: number;
  color?: string;
  [key: string]: any;
}

interface ItemCarrito {
  titulo: string;
  precio: number;
  category_id: string;
  id: string;
  cantidad: number;
  _id: string;
  detalles?: ProductoDetallado;
}

interface Envio {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  dni: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  codigo_postal: string;
  envio: string;
  tipo_de_envio: string;
  apartamento_opcional: string;
  carrito: ItemCarrito[];
  paymentId: string;
  status: string;
  createdAt: string;
  __v: number;
}

const EnviosPendientes = () => {
  const [envios, setEnvios] = useState<Envio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEnvioId, setSelectedEnvioId] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchEnvios = async () => {
      try {
        const response = await fetch(`${apiUrl}/dashboard/envios`);
        if (!response.ok) throw new Error("Error al obtener envíos");
        const data: Envio[] = await response.json();

        // Enriquecer el carrito con detalles de producto
        const enviosConDetalles = await Promise.all(
          data.map(async (envio) => {
            const carritoConDetalles = await Promise.all(
              envio.carrito.map(async (item) => {
                try {
                  const res = await fetch(
                    `${apiUrl}/${item.category_id}/get-id/${item.id}`
                  );
                  if (!res.ok) throw new Error("Error al obtener producto");
                  const detalles = await res.json();
                  return { ...item, detalles };
                } catch (error) {
                  console.error(
                    "Error obteniendo detalles del producto",
                    error
                  );
                  return item;
                }
              })
            );
            return { ...envio, carrito: carritoConDetalles };
          })
        );

        setEnvios(enviosConDetalles);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnvios();
  }, [apiUrl]);

  const handleEnviar = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/dashboard/envios/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar el envío");

      setEnvios((prev) => prev.filter((envio) => envio._id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mx-auto mt-6 p-4">
      <h2 className="text-4xl font-bold">Envíos</h2>

      {loading ? (
        <Skeleton className="h-20 w-full rounded-lg" />
      ) : (
        <div className="flex items-center justify-center flex-col">
          {envios.length > 0 ? (
            envios.map((envio) => (
              <Card key={envio._id} className="mb-4 w-[50%]">
                <CardContent className="p-4 space-y-1">
                  <h3 className="text-lg font-semibold">
                    {envio.nombre} {envio.apellido}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    <strong>Email:</strong> {envio.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Teléfono:</strong> {envio.telefono}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>DNI:</strong> {envio.dni}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Dirección:</strong> {envio.direccion}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Apartamento:</strong> {envio.apartamento_opcional}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Ciudad:</strong> {envio.ciudad}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Provincia:</strong> {envio.provincia}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Código Postal:</strong> {envio.codigo_postal}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Tipo de Envío:</strong> {envio.tipo_de_envio}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Estado:</strong> {envio.status}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Payment ID:</strong> {envio.paymentId}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fecha de Creación:</strong>{" "}
                    {new Date(envio.createdAt).toLocaleString()}
                  </p>

                  <p className="text-sm text-muted-foreground font-semibold mt-2">
                    Carrito:
                  </p>
                  {envio.carrito.map((item, index) => (
                    <div
                      key={index}
                      className="ml-2 mb-2 text-sm text-muted-foreground"
                    >
                      • {item.titulo} - ${item.precio} x {item.cantidad}
                      {item.detalles && (
                        <div className="ml-4 text-xs space-y-1">
                          {item.detalles.color && (
                            <p>Color: {item.detalles.color}</p>
                          )}
                          {item.detalles.batteryStatus != null && (
                            <p>Batería: {item.detalles.batteryStatus}%</p>
                          )}
                          {item.detalles.memory && (
                            <p>Memoria: {item.detalles.memory} GB</p>
                          )}
                          {item.detalles.condition && (
                            <p>Condicion: {item.detalles.condition} </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="mt-3 flex items-center gap-2 cursor-pointer"
                        onClick={() => setSelectedEnvioId(envio._id)}
                      >
                        <CheckCircle className="w-4 h-4" /> Enviar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          ¿Confirmás que el envío fue entregado?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción eliminará el envío de la lista.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            if (selectedEnvioId) {
                              handleEnviar(selectedEnvioId);
                              setSelectedEnvioId(null);
                            }
                          }}
                        >
                          Confirmar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No hay envíos pendientes.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EnviosPendientes;
