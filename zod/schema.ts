import { z } from "zod";

// Modelos de iPhone válidos
export const validModels = [
  "iPhone X",
  "iPhone XR",
  "iPhone XS",
  "iPhone 11",
  "iPhone 11 Pro",
  "iPhone 11 Pro Max",
  "iPhone 12",
  "iPhone 12 Mini",
  "iPhone 12 Pro",
  "iPhone 12 Pro Max",
  "iPhone 13",
  "iPhone 13 Mini",
  "iPhone 13 Pro",
  "iPhone 13 Pro Max",
  "iPhone 14",
  "iPhone 14 Plus",
  "iPhone 14 Pro",
  "iPhone 14 Pro Max",
  "iPhone 15",
  "iPhone 15 Plus",
  "iPhone 15 Pro",
  "iPhone 15 Pro Max",
  "iPhone 16e",
  "iPhone 16",
  "iPhone 16 Pro",
] as const;

// Colores válidos
export const validColors = [
  "Plata",
  "Gris espacial",
  "Azul",
  "Blanco",
  "Amarillo",
  "Coral",
  "Rojo",
  "Negro",
  "Verde",
  "Morado",
  "Oro",
  "Grafito",
  "Azul Pacífico",
  "Rosa",
  "Azul Sierra",
  "Verde Alpino",
  "Verde Noche",
  "Luz estelar",
  "Medianoche",
  "Titanio",
  "Titanio Desierto",
  "Pink", // iPhone 15 y 15 Plus
] as const;

export const memories = [16, 32, 64, 128, 256, 512, 1024] as const;
// Condiciones válidas
export const conditions = ["nuevo", "usado"] as const;

// Esquema de validación

export const productSchema = z
  .object({
    model: z.enum(validModels, {
      errorMap: () => ({ message: "Seleccione un modelo válido" }),
    }),

    condition: z.enum(conditions, {
      errorMap: () => ({ message: "Seleccione la condición del iPhone" }),
    }),

    price: z.coerce.number().min(1, { message: "Debes ingresar un precio" }),

    quantity: z.coerce
      .number()
      .int({ message: "La cantidad debe ser un número entero" })
      .min(1, { message: "Debe haber al menos un producto en stock" }),

    color: z.enum(validColors, {
      errorMap: () => ({ message: "Seleccione un color válido" }),
    }),

    batteryStatus: z
      .union([
        z.coerce
          .number()
          .int({ message: "El estado de la batería debe ser un número entero" })
          .min(1, { message: "El estado de la batería debe ser al menos 1%" })
          .max(100, {
            message: "El estado de la batería no puede superar el 100%",
          }),
        z.undefined(),
      ])
      .optional(),

    memory: z.coerce
      .number()
      .min(8, { message: "La memoria debe ser al menos 8GB" })
      .max(1024, { message: "La memoria no puede superar los 1024GB" }),

    description: z
      .string()
      .min(5, { message: "La descripción debe tener al menos 5 caracteres" })
      .max(500, {
        message: "La descripción no puede superar los 500 caracteres",
      }),

    details: z
      .string()
      .min(5, { message: "Los detalles deben tener al menos 5 caracteres" })
      .max(1000, {
        message: "Los detalles no pueden superar los 1000 caracteres",
      }),

    enabled: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (
      data.condition === "usado" &&
      (data.batteryStatus === undefined || isNaN(data.batteryStatus))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Debe indicar el estado de la batería para iPhones usados",
        path: ["batteryStatus"],
      });
    }

    if (data.condition === "nuevo" && data.quantity < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Debe ingresar una cantidad válida para iPhones nuevos",
        path: ["quantity"],
      });
    }
  });

export type ProductFormValues = z.infer<typeof productSchema>;
