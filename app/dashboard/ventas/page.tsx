"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Venta {
  _id: string;
  nombre: string;
  email: string;
  direccion: string;
  carrito: Array<{ titulo: string; precio: number }>;
  paymentId: string;
  status: string;
  createdAt: string;
}

export default function VentasPage() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchVentas() {
    try {
      const response = await fetch("http://localhost:8085/dashboard/ventas");
      if (!response.ok) throw new Error("Error al obtener ventas");
      const data: Venta[] = await response.json();
      setVentas(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVentas();
  }, []);

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="h-8 w-48" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {ventas.length > 0 ? (
            ventas.map((venta) => (
              <Card key={venta._id} className="w-full">
                <CardHeader>
                  <CardTitle>{venta.nombre}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-semibold">Email:</span> {venta.email}
                  </div>
                  <div>
                    <span className="font-semibold">Dirección:</span>{" "}
                    {venta.direccion}
                  </div>
                  <div>
                    <span className="font-semibold">Estado:</span>{" "}
                    {venta.status}
                  </div>
                  <div>
                    <span className="font-semibold">Payment ID:</span>{" "}
                    {venta.paymentId}
                  </div>
                  <div>
                    <span className="font-semibold">Fecha de Creación:</span>{" "}
                    {new Date(venta.createdAt).toLocaleString()}
                  </div>

                  <div className="mt-2">
                    <span className="font-semibold">Carrito:</span>
                    <ul className="list-disc pl-5 mt-1">
                      {venta.carrito.map((item, index) => (
                        <li key={index}>
                          {item.titulo} - ${item.precio}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline">Ver Detalles</Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No hay ventas registradas.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
