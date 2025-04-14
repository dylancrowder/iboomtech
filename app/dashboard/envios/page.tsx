/* eslint-disable react-hooks/exhaustive-deps */
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
  carrito: Array<{ titulo: string; precio: number }>;
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

      setEnvios((prevEnvios) =>
        prevEnvios.filter((envio) => envio._id !== id)
      );
      console.log("Envío eliminado");
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
                    <p
                      key={index}
                      className="text-sm text-muted-foreground ml-2"
                    >
                      • {item.titulo} - ${item.precio}
                    </p>
                  ))}

                  {/* Botón con confirmación */}
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
