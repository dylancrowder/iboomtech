"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ProductFormValues,
  productSchema,
  conditions,
  validModels,
} from "@/zod/schema";
import { useParams } from "next/navigation";
// Opciones por modelo
const iphoneOptions = {
  "iPhone X": {
    colors: ["Gris espacial", "Plata"],
    memories: [64, 256],
  },
  "iPhone XR": {
    colors: ["Azul", "Blanco", "Amarillo", "Coral", "Negro", "Rojo"],
    memories: [64, 128, 256],
  },
  "iPhone 11": {
    colors: ["Rojo", "Amarillo", "Blanco", "Verde", "Morado", "Negro"],
    memories: [64, 128, 256],
  },
  "iPhone 11 Pro": {
    colors: ["Gris espacial", "Oro", "Plata", "Verde Noche"],
    memories: [64, 256, 512],
  },
  "iPhone 11 Pro Max": {
    colors: ["Gris espacial", "Oro", "Plata", "Verde Noche"],
    memories: [64, 256, 512],
  },
  "iPhone 12": {
    colors: ["Azul", "Rojo", "Blanco", "Negro", "Verde", "Morado"],
    memories: [64, 128, 256],
  },
  "iPhone 12 Mini": {
    colors: ["Azul", "Rojo", "Blanco", "Negro", "Verde", "Morado"],
    memories: [64, 128, 256],
  },
  "iPhone 12 Pro": {
    colors: ["Grafito", "Oro", "Plata", "Azul Pacífico"],
    memories: [128, 256, 512],
  },
  "iPhone 12 Pro Max": {
    colors: ["Grafito", "Oro", "Plata", "Azul Pacífico"],
    memories: [128, 256, 512],
  },
  "iPhone 13": {
    colors: ["Rojo", "Azul", "Blanco", "Negro", "Verde", "Rosa"],
    memories: [128, 256, 512],
  },
  "iPhone 13 Mini": {
    colors: ["Rojo", "Azul", "Blanco", "Negro", "Verde", "Rosa"],
    memories: [128, 256, 512],
  },
  "iPhone 13 Pro": {
    colors: ["Grafito", "Plata", "Oro", "Azul Sierra", "Verde Alpino"],
    memories: [128, 256, 512, 1024],
  },
  "iPhone 13 Pro Max": {
    colors: ["Grafito", "Plata", "Oro", "Azul Sierra", "Verde Alpino"],
    memories: [128, 256, 512, 1024],
  },
  "iPhone 14": {
    colors: ["Azul", "Rojo", "Negro", "Blanco", "Morado"],
    memories: [128, 256, 512],
  },
  "iPhone 14 Plus": {
    colors: ["Azul", "Rojo", "Negro", "Blanco", "Morado"],
    memories: [128, 256, 512],
  },
  "iPhone 14 Pro": {
    colors: ["Negro", "Plata", "Oro", "Morado"],
    memories: [128, 256, 512, 1024],
  },
  "iPhone 14 Pro Max": {
    colors: ["Negro", "Plata", "Oro", "Morado"],
    memories: [128, 256, 512, 1024],
  },
  "iPhone 15": {
    colors: ["Amarillo", "Verde", "Azul", "Pink", "Negro"],
    memories: [128, 256, 512],
  },
  "iPhone 15 Plus": {
    colors: ["Amarillo", "Verde", "Azul", "Pink", "Negro"],
    memories: [128, 256, 512],
  },
  "iPhone 15 Pro": {
    colors: ["Negro", "Blanco", "Oro", "Azul"],
    memories: [128, 256, 512, 1024],
  },
  "iPhone 15 Pro Max": {
    colors: ["Negro", "Blanco", "Oro", "Azul"],
    memories: [256, 512, 1024],
  },
  "iPhone 16": {
    colors: ["Azul", "Verde", "Rosa", "Blanco", "Negro"],
    memories: [128, 256, 512],
  },
  "iPhone 16 Pro": {
    colors: ["Negro", "Blanco", "Titanio", "Titanio Desierto"],
    memories: [256, 512, 1024, 2048],
  },
  "iPhone 16e": {
    colors: ["Blanco", "Negro"],
    memories: [64, 128],
  },
};
export default function EditProductForm() {
  const params = useParams();
  const { id, categoria } = params as { id: string; categoria: string };

  const [loading, setLoading] = useState(true);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      model: undefined,
      price: 0,
      condition: undefined,
      quantity: 1,
      color: undefined,
      batteryStatus: 100,
      memory: 64,
      description: "",
      details: "",
      enabled: true,
    },
  });

  const selectedModel = form.watch("model");
  const modelOptions =
    iphoneOptions[selectedModel as keyof typeof iphoneOptions];
  const availableColors = modelOptions?.colors ?? [];
  const availableMemories = modelOptions?.memories ?? [];

  useEffect(() => {
    async function fetchProduct() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/${categoria}/get-id/${id}`);
        const data = await res.json();
        console.log("esta es lad ata ", data);

        form.reset({
          ...data,
          memory: Number(data.memory),
          batteryStatus: Number(data.batteryStatus),
          price: Number(data.price),
          quantity: Number(data.quantity),
        });

        setLoading(false);
      } catch (err) {
        toast.error("Error al cargar el producto");
        console.error(err);
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, form, categoria]);

  async function onSubmit(data: ProductFormValues) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("esta es la data ewww ", data);

    try {
      const res = await fetch(`${apiUrl}/dashboard/update-id/${id}`, {
        method: "PUT", // Cambiar a PATCH si tu backend lo requiere
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al editar el producto");

      toast.success("Producto editado correctamente");
    } catch (err) {
      toast.error("Error al enviar los datos");
      console.error("❌ Error:", err);
    }
  }

  if (loading) return <p className="text-center p-6">Cargando producto...</p>;

  return (
    <div className="flex justify-center flex-col items-center mt-10">
      <div className="py-6 bg-gray-100 w-full border-b border-gray-500">
        <div className="flex justify-center">
          <span className="text-[1.5rem] p-2 font-medium">Editar iPhone</span>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 lg:py-8 w-full lg:w-[50%] m-6"
        >
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="border-gray-700 w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un modelo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {validModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="border-gray-700 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condición</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="border-gray-700 w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una condición" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition === "nuevo" ? "Nuevo" : "Usado"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="border-gray-700 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="border-gray-700 w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableColors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="batteryStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado de batería (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="border-gray-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="memory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Memoria (GB)</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl className="border-gray-700">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un tamaño de memoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableMemories.map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size} GB
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe el producto"
                    {...field}
                    className="resize-y min-h-[100px] border-gray-700 w-full"
                  />
                </FormControl>
                <FormDescription>Máximo 500 caracteres</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detalles</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Detalles adicionales del producto"
                    {...field}
                    className="resize-y min-h-[100px] border-gray-700 w-full"
                  />
                </FormControl>
                <FormDescription>Máximo 1000 caracteres</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 rounded-md border p-4 border-gray-700 w-full">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>¿Habilitado?</FormLabel>
                  <FormDescription>
                    Marcar para habilitar el producto
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Guardar Cambios
          </Button>
        </form>
      </Form>
    </div>
  );
}
