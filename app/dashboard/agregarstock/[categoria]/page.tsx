/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  conditions,
  ProductFormValues,
  productSchema,
  validModels,
} from "@/zod/schema";

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

export default function ProductForm() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      model: undefined,
      price: undefined,
      condition: undefined,
      quantity: 1,
      color: undefined,
      batteryStatus: undefined,
      memory: undefined,
      description: "",
      details: "",
      enabled: true,
    },
  });

  const selectedModel = form.watch("model");
  const condition = form.watch("condition");
  const isUsed = condition === "usado";
  const isNew = condition === "nuevo";

  useEffect(() => {
    if (condition === "nuevo") {
      form.setValue("batteryStatus", 100);
    } else if (condition === "usado") {
      form.setValue("batteryStatus", undefined);
    }
  }, [condition, form]);

  useEffect(() => {
    if (isUsed) {
      form.setValue("quantity", 1);
    }
  }, [isUsed, form]);

  const modelOptions: any =
    iphoneOptions[selectedModel as keyof typeof iphoneOptions];
  const availableColors = modelOptions?.colors ?? [];
  const availableMemories = modelOptions?.memories ?? [];

  async function onSubmit(data: ProductFormValues) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("esta es la data quie se envia ", data);

    try {
      const response = await fetch(`${apiUrl}/dashboard/crear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al crear el iPhone");
      }

      const result = await response.json();
      toast.success("iPhone creado correctamente");
      console.log("iPhone creado correctamente:", result);
    } catch (error) {
      toast.error("Error al enviar los datos");
      console.error("❌ Error al enviar los datos:", error);
    }
  }

  return (
    <div className="flex justify-center flex-col lg:w-[100%] xl:w-[100%]  items-center mt-17 lg:mt-0 ">
      <div className=" py-6 bg-gray-100 lg:border-b lg:border-gray-500 w-full ">
        <div className="flex  justify-center ">
          <span className="font text-[1.5rem] p-2 text-bold font-medium  ">
            Añadir iPhones
          </span>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6  lg:py-8 w-[100%] lg:w-[50%]  m-6 "
        >
          {/* Modelo */}
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
                  <FormControl className="border-gray-700 w-[100%]">
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

          {/* Precio */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seleccione un Precio"
                    type="number"
                    value={field.value === undefined ? "" : field.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
                    className="border-gray-700 w-[100%]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Condición */}
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
                  <FormControl className="border-gray-700 w-[100%]">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una Condición" />
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

          {/* Cantidad (solo si es nuevo) */}
          {isNew && (
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
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="border-gray-700 w-[100%]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Estado de la batería (solo si es usado) */}

          {isUsed && (
            <FormField
              control={form.control}
              name="batteryStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado de la batería (%)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Seleccione el estado de la batería"
                      type="number"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                      className="border-gray-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {isNew && (
            <FormField
              control={form.control}
              name="batteryStatus"
              render={({ field }) => (
                <input type="hidden" {...field} value={100} />
              )}
            />
          )}

          {/* Color */}
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
                  <FormControl className="border-gray-700 w-[100%]">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableColors.map((color: any) => (
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

          {/* Memoria */}
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
                  <FormControl className="border-gray-700 ">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un tamaño de memoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableMemories.map((size: any) => (
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

          {/* Descripción */}
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
                    className="resize-y min-h-[100px] border-gray-700 w-[100%]"
                  />
                </FormControl>
                <FormDescription>Máximo 500 caracteres</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Detalles */}
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
                    className="resize-y min-h-[100px] border-gray-700 w-[100%]"
                  />
                </FormControl>
                <FormDescription>Máximo 1000 caracteres</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Habilitado */}
          <FormField
            control={form.control}
            name="enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-gray-700 w-[100%]">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>¿Habilitado?</FormLabel>
                  <FormDescription>
                    Marque esta casilla para habilitar el producto
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </Form>
    </div>
  );
}
