/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCarritoStore } from "@/zustand/carritoStore";
import { toast } from "sonner";
import { useImageForProduct } from "@/hooks/imagenes";
import { productoSchema } from "@/zod/carrito.schemazod";

interface Product {
  _id: string;
  model: string;
  condition: string;
  price: number;
  quantity: number;
  color: string;
  batteryStatus: number;
  memory: number;
  details: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [localQuantity, setLocalQuantity] = useState<number>(0);

  const { categoria, productId } = useParams();
  const isPhone = categoria === "iphone" || categoria === "android";
  const isMacbook = categoria === "macbooks";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8085";

  const fetchProductos = async () => {
    try {
      const response = await fetch(`${apiUrl}/${categoria}/get-id/${productId}`);
      if (!response.ok) {
        throw new Error(`Error al obtener el producto: ${response.statusText}`);
      }
      const data: Product = await response.json();
      setProduct(data);
      setLocalQuantity(data.quantity);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductos();
    }
  }, [productId]);

  const { agregarAlCarrito } = useCarritoStore();

  const getColorBackground = (colorName: string) => {
    switch (colorName.toLowerCase()) {
      case "medianoche":
        return "bg-slate-900";
      case "plata":
        return "bg-gray-200";
      case "oro":
        return "bg-yellow-100";
      case "azul":
        return "bg-blue-500";
      case "rojo":
        return "bg-red-500";
      case "verde":
        return "bg-green-500";
      case "negro":
        return "bg-black";
      case "blanco":
        return "bg-white border border-gray-200";
      default:
        return "bg-gray-400";
    }
  };

  const formatMemory = (memory: number) => {
    return memory >= 1000 ? `${memory / 1000} TB` : `${memory} GB`;
  };

  const getConditionText = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "nuevo":
        return "Nuevo";
      case "usado":
        return "Usado";
      case "refurbished":
        return "Reacondicionado";
      default:
        return condition;
    }
  };

  const imageSrc = useImageForProduct(product?.model || "", product?.color || "");

  if (loading) return <div className="text-center p-6">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!product) return <div className="text-center p-6">Producto no encontrado</div>;

  return (
    <div className="container mx-auto py-4 max-w-[90%] lg:pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card className="flex items-center justify-center">
            <CardContent className="p-4 lg:w-[60%]">
              <Image
                src={imageSrc}
                alt={imageSrc}
                width={200}
                className="w-full h-auto rounded-md"
                priority
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center">
              <Badge
                variant={localQuantity > 0 ? "default" : "destructive"}
                className="mb-2"
              >
                {localQuantity > 0 ? "En Stock" : "Agotado"}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold">{product.model}</h1>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="mr-2">
                {getConditionText(product.condition)}
              </Badge>
            </div>
            <p className="text-2xl font-bold mt-2 text-primary">
              ${product.price.toLocaleString()}
            </p>
          </div>

          {isPhone && product.condition.toLowerCase() !== "nuevo" && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Estado de la batería</span>
                <span className="text-sm">{product.batteryStatus}%</span>
              </div>
              <Progress value={product.batteryStatus} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {product.batteryStatus >= 80
                  ? "Excelente estado de batería"
                  : product.batteryStatus >= 50
                  ? "Buen estado de batería"
                  : "Batería con uso significativo"}
              </p>
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full ${getColorBackground(
                    product.color
                  )}`}
                ></div>
                <span className="text-sm">{product.color}</span>
              </div>
            </div>

            {(isPhone || isMacbook) && (
              <div>
                <h3 className="font-medium mb-2">Almacenamiento</h3>
                <div className="flex items-center space-x-2 bg-muted p-2 rounded-md">
                  <span className="text-sm">{formatMemory(product.memory)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4">
            <Button
              className="w-full text-sm h-10 cursor-pointer mt-2 bg-[#1f1f1f] text-white hover:bg-[#333] active:bg-[#111] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
              disabled={localQuantity === 0}
              onClick={() => {
                if (product && localQuantity > 0) {
                  const parsed = productoSchema.safeParse(product);

                  if (!parsed.success) {
                    toast.error("El producto no tiene un formato válido");
                    console.error("Errores de validación", parsed.error.format());
                    return;
                  }

                  agregarAlCarrito(parsed.data);
                  setLocalQuantity((prev) => prev - 1);
                  toast.success(`${product.model} añadido al carrito`);
                }
              }}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Añadir al carrito
            </Button>
          </div>

          <Separator />

          <Tabs defaultValue="specs">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="specs">Especificaciones</TabsTrigger>
              <TabsTrigger value="condition">Estado</TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="pt-4">
              <div className="space-y-4">
                <h3 className="font-medium">Especificaciones técnicas</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Modelo:</span>
                    <span className="font-medium">{product.model}</span>
                  </li>
                  {isPhone && (
                    <>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Almacenamiento:</span>
                        <span className="font-medium">{formatMemory(product.memory)}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Estado de batería:</span>
                        <span className="font-medium">{product.batteryStatus}%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Color:</span>
                        <span className="font-medium">{product.color}</span>
                      </li>
                    </>
                  )}
                  {isMacbook && (
                    <>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Almacenamiento:</span>
                        <span className="font-medium">{formatMemory(product.memory)}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Procesador:</span>
                        <span className="font-medium">Apple M1</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">RAM:</span>
                        <span className="font-medium">8GB</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="condition" className="pt-4">
              <div className="space-y-4">
                <h3 className="font-medium">Estado del producto</h3>
                <p className="text-sm text-muted-foreground">
                  {product.details || "Sin detalles adicionales sobre el estado del producto."}
                </p>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm font-medium">
                    Clasificación: {getConditionText(product.condition)}
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-2">
                    {product.condition.toLowerCase() === "usado" && (
                      <>
                        <li>Dispositivo usado en buen estado estético y funcional</li>
                        <li>Puede presentar signos leves de uso</li>
                        <li>Completamente funcional</li>
                        <li>Batería al {product.batteryStatus}%</li>
                      </>
                    )}
                    {product.condition.toLowerCase() === "nuevo" && (
                      <>
                        <li>Dispositivo nuevo, sin abrir</li>
                        <li>Garantía completa del fabricante</li>
                        <li>Todos los accesorios originales incluidos</li>
                      </>
                    )}
                    {product.condition.toLowerCase() === "refurbished" && (
                      <>
                        <li>Dispositivo reacondicionado por técnicos certificados</li>
                        <li>Piezas originales o de alta calidad</li>
                        <li>Batería reemplazada o en excelente estado</li>
                        <li>Garantía de 6 meses</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
