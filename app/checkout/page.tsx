"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// UI Components
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CardContent, CardTitle, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Icons
import { ShieldCheck, Store, Truck } from "lucide-react"
import { useCarritoStore } from "@/zustand/carritoStore"

//images
import logo from "../../assets/imagenes/logotipo/LOGO-negro-iboom.png"
// Schema for validation
const paymentSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Debe ser un correo válido"),
  direccion: z.string().min(5, "La dirección debe tener al menos 5 caracteres").optional(),
  ciudad: z.string().min(2, "Debe especificar una ciudad").optional(),
  codigo_postal: z.string().min(2, "Debe especificar una codigo postal").optional(),
  apartamento_opcional: z.string().optional(),
  provincia: z.string().min(2, "Debe especificar una provincia").optional(),
  telefono: z.string().min(10, "El teléfono debe tener al menos 10 caracteres").optional(),
  dni: z.string().min(2, "Debe especificar una dni").optional(),
  envio: z.enum(["domicilio", "retiro"]).default("domicilio"),
  metodoPago: z.enum(["mercadopago", "transferencia"]),
})

type FormData = z.infer<typeof paymentSchema>

export default function CheckoutPage() {
  const [envio, setEnvio] = useState("domicilio")
  const [selectedMethod, setSelectedMethod] = useState("")
  const { carrito } = useCarritoStore()

  const total = carrito.reduce((acc, producto) => acc + producto.price * producto.quantity, 0)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      envio: "domicilio",
    },
  })

  const onSubmit = async (data: FormData) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    console.log("Form data:", data)

    if (carrito.length === 0) {
      alert("Tu carrito está vacío. Agrega productos para continuar.")
      return
    }

    try {
      // This would be replaced with your actual API endpoint
      const response = await fetch(
        `${apiUrl}/api/payments/create_preference`,

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, carrito: carrito }),
        },
      )

      const result = await response.json()

      if (!response.ok) throw new Error(result.error)

      // Redirect to payment gateway
      window.location.href = result.init_point
    } catch (error) {
      console.error("Error al procesar el pago:", error)
      alert("Error al procesar el pago. Intenta de nuevo.")
    }
  }

  return (
    <>
      <div className="flex h-16 border items-center justify-center w-full px-4 md:w-full md:px-0">
        <div className="flex items-center justify-between w-[90%] md:justify-start">
          {/* Logo */}
          <Link href="/" className="mr-4 flex-shrink-0 mb-2">
            <div className="h-8 w-32 md:h-10 md:w-50 flex items-center">
              <Image
                src={logo}
                alt="logo"
                width={160}
                height={40}
                className="object-contain"
              />
            </div>
          </Link>
        </div>
      </div>

      <div className="flex w-full justify-center items-center">
        <div className="flex flex-col md:flex-row justify-center w-[90%] gap-6">
          {/* Order Summary - Now first on mobile but not overlapping */}
          <div className="w-full md:w-1/2 md:order-2 border-b pb-4 mb-4 md:border-b-0 md:border-l md:pb-0 md:mb-0 bg-muted p-4 md:p-8 ">
            <div className="w-full">
              <div className="mb-6">
                <CardTitle className="text-xl">Resumen del Pedido</CardTitle>
              </div>
              <div className="max-h-[40vh]">
                {carrito.length === 0 ? (
                  <p className="text-muted-foreground">Tu carrito está vacío.</p>
                ) : (
                  <ul className="space-y-4">
                    {carrito.map((producto) => (
                      <li key={producto._id} className="flex flex-col border-b pb-4">
                        <div className="flex justify-between">
                          <span className="font-medium">
                            {producto.model} - {producto.memory}GB
                          </span>
                          <span>${producto.price.toFixed(2)}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <div className="flex justify-between">
                            <span>Cantidad:</span>
                            <span>{producto.quantity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Condición:</span>
                            <span>{producto.condition || "Nuevo"}</span>
                          </div>
                          {producto.batteryStatus && (
                            <div className="flex justify-between">
                              <span>Estado de batería:</span>
                              <span>{producto.batteryStatus}</span>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-6 font-bold text-lg flex justify-between">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Contact and Shipping Form - Now second on mobile */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-full ">
            <div className="w-full bg-background p-4 md:p-8 rounded-lg">
              <div className="pb-12">
                <div className="pb-4">
                  <CardTitle className="text-xl">Contacto</CardTitle>
                </div>
                <div>
                  <Input type="email" placeholder="Email" {...register("email")} className="w-full p-4" />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Shipping Method Section */}
              <div className="pb-8">
                <div className="pb-2">
                  <CardTitle>Tipo de envío</CardTitle>
                </div>

                <ToggleGroup
                  type="single"
                  value={envio}
                  onValueChange={(value) => {
                    if (value) {
                      setEnvio(value)
                    }
                  }}
                  className="flex w-full justify-between border"
                >
                  <ToggleGroupItem
                    value="domicilio"
                    {...register("envio")}
                    className="w-full text-center data-[state=on]:text-primary-foreground data-[state=on]:bg-primary transition-colors"
                  >
                    <Truck className="mr-2 h-5 w-5" /> Envío a domicilio
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="retiro"
                    {...register("envio")}
                    className="w-full text-center data-[state=on]:text-primary-foreground data-[state=on]:bg-primary transition-colors"
                  >
                    <Store className="mr-2 h-5 w-5" /> Retiro en el local
                  </ToggleGroupItem>
                </ToggleGroup>

                <div className="pt-8">
                  <div className="">
                    <CardTitle className="text-xl pb-4">Dirección de entrega</CardTitle>
                  </div>

                  {envio === "domicilio" ? (
                    <>
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full">
                            <Input type="text" placeholder="Nombre" {...register("nombre")} className="w-full py-6" />
                            {errors.nombre && <p className="text-destructive text-sm mt-1">{errors.nombre.message}</p>}
                          </div>
                          <div className="w-full">
                            <Input
                              type="text"
                              placeholder="Apellido"
                              {...register("apellido")}
                              className="w-full py-6"
                            />
                            {errors.apellido && (
                              <p className="text-destructive text-sm mt-1">{errors.apellido.message}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Input type="text" placeholder="DNI" {...register("dni")} className="w-full py-6" />
                          {errors.dni && <p className="text-destructive text-sm mt-1">{errors.dni.message}</p>}
                        </div>

                        <div>
                          <Input type="text" placeholder="Teléfono" {...register("telefono")} className="w-full py-6" />
                          {errors.telefono && (
                            <p className="text-destructive text-sm mt-1">{errors.telefono.message}</p>
                          )}
                        </div>

                        <div>
                          <Input
                            type="text"
                            placeholder="Dirección"
                            {...register("direccion")}
                            className="w-full py-6"
                          />
                          {errors.direccion && (
                            <p className="text-destructive text-sm mt-1">{errors.direccion.message}</p>
                          )}
                        </div>

                        <div>
                          <Input
                            type="text"
                            placeholder="Casa, Apartamento, etc (Opcional)"
                            {...register("apartamento_opcional")}
                            className="w-full py-6"
                          />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full">
                            <Input
                              type="text"
                              placeholder="Código postal"
                              {...register("codigo_postal")}
                              className="w-full py-6"
                            />
                            {errors.codigo_postal && (
                              <p className="text-destructive text-sm mt-1">{errors.codigo_postal.message}</p>
                            )}
                          </div>

                          <div className="w-full">
                            <Input type="text" placeholder="Ciudad" {...register("ciudad")} className="w-full py-6" />
                            {errors.ciudad && <p className="text-destructive text-sm mt-1">{errors.ciudad.message}</p>}
                          </div>

                          <div className="w-full">
                            <Input
                              type="text"
                              placeholder="Provincia"
                              {...register("provincia")}
                              className="w-full py-6"
                            />
                            {errors.provincia && (
                              <p className="text-destructive text-sm mt-1">{errors.provincia.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 border rounded-lg mx-auto w-full bg-muted h-auto">
                      <h2 className="mb-2 text-sm font-bold">iBoomtech</h2>

                      <div className="mb-2">
                        <h2>Dirección:</h2>
                        <h2 className="text-[0.9rem] text-muted-foreground">Calle Ficticia 123, Ciudad, País</h2>
                      </div>

                      <div className="mb-2">
                        <h2>Horario:</h2>
                        <h2 className="text-[0.9rem] text-muted-foreground">Lunes a Viernes: 9:00 AM - 6:00 PM</h2>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="pb-4">
                <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
                <Card className="w-full rounded-lg">
                  <CardContent className="p-4">
                    <Label className="block text-sm text-muted-foreground">Selecciona un método de pago</Label>
                    <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-2 py-4">
                      <Label className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                        <RadioGroupItem value="mercadopago" {...register("metodoPago")} />
                        <span className="font-medium">Mercado Pago</span>
                      </Label>

                      {selectedMethod === "mercadopago" && (
                        <div className="p-4 border rounded-lg mx-auto w-full bg-muted h-auto">
                          <div>
                            <h2 className="text-[0.9rem]">
                              Después de hacer clic en Pagar, serás redirigido a Mercado Pago para completar tu compra
                              de forma segura.
                            </h2>
                          </div>
                        </div>
                      )}

                      <Label className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                        <RadioGroupItem value="transferencia" {...register("metodoPago")} />
                        <span className="font-medium">Transferencia Bancaria</span>
                      </Label>

                      {selectedMethod === "transferencia" && (
                        <div className="p-4 border rounded-lg mx-auto w-full bg-muted h-auto">
                          <div>
                            <h2 className="text-[0.9rem]">
                              Seguir las instrucciones de pago. Al finalizar tu pedido te vamos a contactar por
                              WhatsApp.
                            </h2>
                          </div>
                        </div>
                      )}
                    </RadioGroup>

                    <p className="text-xs text-muted-foreground flex items-center mt-2">
                      <ShieldCheck className="w-4 h-4 mr-1 text-green-500" /> Todas las transacciones son seguras y
                      están encriptadas.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Button - Now at the very end, no special positioning */}
              <div className="mt-8 pb-4">
                <Button type="submit" className="w-full h-12" disabled={!selectedMethod}>
                  Pagar ${total.toFixed(2)}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

