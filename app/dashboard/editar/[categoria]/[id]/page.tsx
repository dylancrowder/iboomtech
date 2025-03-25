/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { memories, productSchema, validColors, validModels } from "@/zod/schema";

export default function ProductoDetalle() {

  const router = useRouter();
  const [producto, setProducto] = useState(null);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8085/iphone/get-id/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProducto(data);
          Object.keys(data).forEach((key) => setValue(key, data[key]));
        })
        .catch((err) => console.error("Error al cargar el producto:", err));
    }
  }, [id, setValue]);

  const onSubmit = (data  :any) => {
    fetch(`http://localhost:8085/dashboard/update-id/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Producto actualizado correctamente");
        router.push("/dashboard");
      })
      .catch((err) => console.error("Error al actualizar el producto:", err));
  };

  if (!producto) return <p className="text-center">Cargando datos...</p>;

  return (
    <Card className="max-w-lg mx-auto mt-8 p-6 shadow-lg">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Editar {producto.model}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Modelo</Label>
            <Controller
              name="model"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    {validModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          
          <div>
            <Label>Color</Label>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un color" />
                  </SelectTrigger>
                  <SelectContent>
                    {validColors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label>Memoria</Label>
            <Controller
              name="memory"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la memoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {memories.map((memory) => (
                      <SelectItem key={memory} value={memory}>
                        {memory} GB
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label>Precio</Label>
            <Input type="number" {...register("price")} />
          </div>

          <div>
            <Label>Cantidad</Label>
            <Input type="number" {...register("quantity")} />
          </div>

          <div>
            <Label>Estado de batería</Label>
            <Input type="number" {...register("batteryStatus")} />
          </div>

          <div className="flex items-center gap-2">
            <Label>Habilitar Producto</Label>
            <Controller
              name="enabled"
              control={control}
              render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
            />
          </div>

          <Button type="submit" className="w-full">Actualizar Producto</Button>
        </form>
      </CardContent>
    </Card>
  );
}
