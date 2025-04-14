import { z } from "zod";

// Schema para un producto del carrito
export const productoSchema = z.object({
  _id: z.string(),
  model: z.string(),
  condition: z.string(),
  price: z.number(),
  quantity: z.number().min(1, "La cantidad debe ser al menos 1"),
  color: z.string(),
  batteryStatus: z.number(),
  memory: z.number(),
  enabled: z.boolean(),
  category: z.string(),
});

// Schema del carrito
export const carritoSchema = z
  .array(productoSchema)
  .min(1, "El carrito no puede estar vacío");
