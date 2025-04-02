"use client";
//Requeridos
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
//Componentes Ui
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
//Zod
import {
  conditions,
  memories,
  ProductFormValues,
  productSchema,
  validColors,
  validModels,
} from "@/zod/schema";

export default function ProductForm() {
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

  async function onSubmit(data: ProductFormValues) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
                    className="border-gray-700 w-[100%]"
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
                    className="border-gray-700 w-[100%]"
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
                  <FormControl className="border-gray-700 w-[100%]">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {validColors.map((color) => (
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
                <FormLabel>Estado de la batería (%)</FormLabel>
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
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl className="border-gray-700 ">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un tamaño de memoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {memories.map((size) => (
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
                    className="resize-y min-h-[100px] border-gray-700 w-[100%]"
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
                    className="resize-y min-h-[100px] border-gray-700 w-[100%]"
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
