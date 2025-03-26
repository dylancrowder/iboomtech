/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCarritoStore } from "@/zustand/carritoStore";
import { toast } from "sonner";
// Sample product data - in a real app, you would fetch this from your API
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

  const { categoria, productId } = useParams();

  // Determine product type based on category
  const isPhone = categoria === "iphones" || categoria === "android";
  const isMacbook = categoria === "macbooks";
  /*   const isAccessory = categoria === "accesorios"; */

  const fetchProductos = async () => {
    try {
      const response = await fetch(
        `http://localhost:8085/${categoria}/get-id/${productId}`
      );

      if (!response.ok) {
        throw new Error(`Error al obtener el producto: ${response.statusText}`);
      }

      const data: Product = await response.json();
      console.log(data);

      setProduct(data);
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
  // Get color background based on color name
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold">Producto no encontrado</h2>
      </div>
    );
  }

  // Format memory for display
  const formatMemory = (memory: number) => {
    return memory >= 1000 ? `${memory / 1000} TB` : `${memory} GB`;
  };

  // Get condition text in Spanish
  const getConditionText = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "new":
        return "Nuevo";
      case "used":
        return "Usado";
      case "refurbished":
        return "Reacondicionado";
      default:
        return condition;
    }
  };

  // Get icon based on category
  /*   const getCategoryIcon = () => {
    if (isPhone) return <Smartphone className="h-5 w-5 mr-2" />;
    if (isMacbook) return <Laptop className="h-5 w-5 mr-2" />;
    return <Info className="h-5 w-5 mr-2" />;
  }; */

  if (loading) return <div className="text-center p-6">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto  py-4 max-w-[90%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {/* Product Image - Single image only */}
        <div>
          <Card>
            <CardContent className="p-2">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt={product.model}
                width={600}
                height={600}
                className="w-full h-auto rounded-md"
              />
            </CardContent>
          </Card>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center">
              <Badge
                variant={product.quantity > 0 ? "default" : "destructive"}
                className="mb-2"
              >
                {product.quantity > 0 ? "En Stock" : "Agotado"}
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

          {isPhone && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  Estado de la batería
                </span>
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
            {/* Color section - showing just one color */}
            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full  ${getColorBackground(
                    product.color
                  )}`}
                ></div>
                <span className="text-sm">{product.color}</span>
              </div>
            </div>

            {/* Memory/Storage options */}
            {(isPhone || isMacbook) && (
              <div>
                <h3 className="font-medium mb-2">Almacenamiento</h3>
                <div className="flex items-center space-x-2 bg-muted p-2 rounded-md">
                  <span className="text-sm">
                    {formatMemory(product.memory)}
                  </span>
                </div>
              </div>
            )}

            <div>
              <h3 className="font-medium mb-2">Cantidad</h3>
              <Select defaultValue="1">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Cantidad" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-4">
            <Button
              className="w-full cursor-pointer"
              size="lg"
              onClick={() => {
                if (product) {
                  agregarAlCarrito(product);
                  toast.success(`${product.model} añadido al carrito`, {
                    action: {
                      label: "Ver carrito",
                      onClick: () => console.log("Ir al carrito"),
                    },
                  });
                }
              }}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Añadir al carrito
            </Button>
          </div>

          <Separator />

          <Tabs defaultValue="specs">
            <TabsList className="grid w-full grid-cols-2 ">
              <TabsTrigger className="cursor-pointer" value="specs ">
                Especificaciones
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="condition">
                Estado
              </TabsTrigger>
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
                        <span className="text-muted-foreground">
                          Almacenamiento:
                        </span>
                        <span className="font-medium">
                          {formatMemory(product.memory)}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          Estado de batería:
                        </span>
                        <span className="font-medium">
                          {product.batteryStatus}%
                        </span>
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
                        <span className="text-muted-foreground">
                          Almacenamiento:
                        </span>
                        <span className="font-medium">
                          {formatMemory(product.memory)}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          Procesador:
                        </span>
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
                  {product.details ||
                    "Sin detalles adicionales sobre el estado del producto."}
                </p>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm font-medium">
                    Clasificación: {getConditionText(product.condition)}
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-2">
                    {product.condition.toLowerCase() === "used" && (
                      <>
                        <li>
                          Dispositivo usado en buen estado estético y funcional
                        </li>
                        <li>Puede presentar signos leves de uso</li>
                        <li>Completamente funcional</li>
                        <li>Batería al {product.batteryStatus}%</li>
                      </>
                    )}
                    {product.condition.toLowerCase() === "new" && (
                      <>
                        <li>Dispositivo nuevo, sin abrir</li>
                        <li>Garantía completa del fabricante</li>
                        <li>Todos los accesorios originales incluidos</li>
                      </>
                    )}
                    {product.condition.toLowerCase() === "refurbished" && (
                      <>
                        <li>
                          Dispositivo reacondicionado por técnicos certificados
                        </li>
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
