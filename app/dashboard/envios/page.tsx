/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { CheckCircle } from "lucide-react";

interface Envio {
  _id: string;
  nombre: string;
  email: string;
  direccion: string;
  carrito: Array<object>;
  paymentId: string;
  status: string;
  createdAt: string;
  __v: number;
}

const EnviosPendientes = () => {
  const [envios, setEnvios] = useState<Envio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  async function fetchEnvios() {
    try {
      const response = await fetch(`${apiUrl}/dashboard/envios`);
      if (!response.ok) throw new Error("Error al obtener envíos");
      const data: Envio[] = await response.json();
      console.log("esta es la data del envio ", data);

      setEnvios(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEnvios();
  }, []);

  async function handleEnviar(id: string) {
    try {
      const response = await fetch(
        `http://localhost:8085/dashboard/envios/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el envío");
      }

      setEnvios((prevEnvios) => prevEnvios.filter((envio) => envio._id !== id));
      console.log("Envío eliminado");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className=" mx-auto mt-6 p-4">
      <h2 className="text-4xl font-bold ">Envíos</h2>

      {loading ? (
        <Skeleton className="h-20 w-full rounded-lg" />
      ) : (
        <div className="flex items-center justify-center">
          {envios.length > 0 ? (
            envios.map((envio) => (
              <Card key={envio._id} className="mb-4 w-[50%]">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{envio.nombre}</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong>Email:</strong> {envio.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Dirección:</strong> {envio.direccion}
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
                  <Button
                    className="mt-3 flex items-center gap-2 cursor-pointer
"
                    onClick={() => handleEnviar(envio._id)}
                  >
                    <CheckCircle className="w-4 h-4" /> Enviado
                  </Button>
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
