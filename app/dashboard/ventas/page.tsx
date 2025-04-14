"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="mx-auto mt-6 p-4">
      <h2 className="text-4xl font-bold mb-4">Ventas</h2>

      {loading ? (
        <Skeleton className="h-20 w-full rounded-lg" />
      ) : (
        <div className="flex items-center justify-center flex-col">
          {ventas.length > 0 ? (
            ventas.map((venta) => (
              <Card key={venta._id} className="mb-4 w-[50%]">
                <CardContent className="p-4 space-y-1">
                  <h3 className="text-lg font-semibold">{venta.nombre}</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong>Email:</strong> {venta.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Dirección:</strong> {venta.direccion}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Estado:</strong> {venta.status}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Payment ID:</strong> {venta.paymentId}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fecha de Creación:</strong>{" "}
                    {new Date(venta.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground font-semibold mt-2">
                    Carrito:
                  </p>
                  {venta.carrito.map((item, index) => (
                    <p
                      key={index}
                      className="text-sm text-muted-foreground ml-2"
                    >
                      • {item.titulo} - ${item.precio}
                    </p>
                  ))}
                  <Button className="mt-3">Ver Detalles</Button>
                </CardContent>
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
