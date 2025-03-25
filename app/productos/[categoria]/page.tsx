/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useProductStores } from "@/zustand/filtro-data";
import useFilterStore from "@/zustand/filtro-productos";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
interface Product {
  _id: string;
  model: string;
  condition: string;
  price: number;
  memory: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Accede a los filtros y orden desde Zustand
  const { model, color, memory, sortOrder, setCategory } = useFilterStore();
  const { setProductsData } = useProductStores();
  const { categoria } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();

        // Agregar filtros al URL
        if (model) params.append("model", model);
        if (color) params.append("color", color);
        if (memory) params.append("memory", memory);

        // Agregar parámetros de orden
        params.append("sortBy", "price"); // Siempre ordenar por precio
        params.append("sortOrder", sortOrder === "des" ? "asc" : "desc");

        const response = await fetch(
          `http://localhost:8085/${categoria}/get-all?${params.toString()}`
        );

        if (!response.ok) {
          setProductsData([]);
          setProducts([]);
          throw new Error("Error al obtener productos");
        }

        const data = await response.json();
        setProductsData(data);
        setProducts(data);
        setCategory(categoria);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    model,
    color,
    memory,
    categoria,
    sortOrder,
    setProductsData,
    setCategory,
  ]); // Se ejecuta cuando cambian los filtros o el orden

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-1 ">
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <Card
                key={product._id}
                className="flex flex-col gap-0 h-auto overflow-hidden m-0 p-0"
              >
                {/* 🔹 Imagen más pequeña */}
                <div className="relative w-full pt-[100%] ">
                  <div className="absolute inset-0 bg-gray-200 rounded-t-md"></div>
                </div>

                <div className="flex flex-col flex-1 p-3">
                  <CardHeader className="p-2 pb-0">
                    <h3 className="font-medium text-base line-clamp-1">
                      {product.model}
                    </h3>
                  </CardHeader>

                  <CardContent className="p-2 pt-1 flex-1">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs">
                        {product.condition}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {product.memory} GB
                      </span>
                    </div>
                    <p className="font-bold text-lg mt-1">${product.price}</p>
                  </CardContent>

                  <Link
                    href={`/detalles/${categoria}/${product._id}`}
                    passHref
                    className="p-0 pt-0 mt-auto"
                  >
                    <Button className="w-full text-sm h-10">
                      Ver detalles
                    </Button>
                  </Link>
                </div>
              </Card>
            ))
          ) : (
            <div>No products available</div>
          )}
        </div>
      </div>
    </div>
  );
}
