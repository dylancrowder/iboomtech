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
});

// Schema del carrito
export const carritoSchema = z.array(productoSchema).min(1, "El carrito no puede estar vacío");

// Schema del formulario de pago
export const paymentSchema = z.object({
  nombre: z.string().min(4, "El nombre debe tener al menos 4 caracteres"),
  apellido: z.string().min(4, "El apellido debe tener al menos 4 caracteres"),
  email: z.string().email("Debe ser un correo válido"),
  direccion: z.string().min(5, "La dirección debe tener al menos 5 caracteres").optional(),
  ciudad: z.string().min(2, "Debe especificar una ciudad"),
  codigo_postal: z.string().min(2, "Debe especificar un código postal").optional(),
  apartamento_opcional: z.string().optional(),
  provincia: z.string().min(2, "Debe especificar una provincia"),
  telefono: z.string().min(10, "El teléfono debe tener al menos 10 caracteres").optional(),
  dni: z.string().min(5, "Debe especificar un DNI"),
  envio: z.enum(["domicilio", "retiro"]),
  metodoPago: z.enum(["mercadopago", "transferencia"]),
});

// Schema final combinado
export const checkoutSchema = paymentSchema.extend({
  carrito: carritoSchema,
});
