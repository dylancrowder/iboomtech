/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
//componentes UI
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
//Zustand
import { useProductStores } from "@/zustand/filtro-data";
import useFilterStore from "@/zustand/filtro-productos";
//hooks
import { useImageForProduct } from "@/hooks/imagenes";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  //states
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //store
  const { model, color, memory, sortOrder, setCategory, condition } =
    useFilterStore();

  //hooks
  const { setProductsData } = useProductStores();
  const { categoria }: any = useParams();

  interface Product {
    _id: string;
    model: string;
    condition: string;
    price: number;
    memory: string;
    color: string;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();

        if (model) params.append("model", model);
        if (color) params.append("color", color);
        if (memory) params.append("memory", memory);
        if (condition) params.append("condition", condition);

        params.append("sortBy", "price");
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

    if (categoria) {
      fetchProducts();
    } else {
      setError("Categoria no válida.");
      setLoading(false);
    }
  }, [
    model,
    color,
    memory,
    categoria,
    sortOrder,
    setProductsData,
    setCategory,
    condition,
  ]);
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card
            key={index}
            className="flex flex-col gap-0 h-auto overflow-hidden m-0 p-0"
          >
            <Skeleton className="w-full h-[290px]" />
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[100vh]">

   
      <Alert className="bg-red-100 text-red-600 border-red-400 p-4 rounded-lg ">
        <AlertDescription>{error}</AlertDescription>
      </Alert>   </div>
    );
  }
  return (
    <div className="flex flex-1 lg:mb-16 ">
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => {
              const imageSrc = useImageForProduct(product.model, product.color);
              return (
                <Card
                  key={product._id}
                  className="flex flex-col gap-0 h-auto overflow-hidden m-0 p-0 "
                >
                  <div className="relative w-fl border flex items-center justify-center h-[290px]">
                    <div className=" max-w-[180px]">
                      <Image
                        src={imageSrc}
                        alt={`${product.model} ${product.color}`}
                        width={180}
                        height={180}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 items-start w-full py-4 px-4 ">
                    <CardHeader className="w-full m-0 p-0 pb-1 ">
                      <h3 className="font-medium text-base line-clamp-1">
                        {product.model} {product.color.toLowerCase()}
                      </h3>
                    </CardHeader>

                    <CardContent className=" w-full m-0 p-0 pb-1">
                      <div className="flex justify-between mb-1">
                        <Badge
                          className={`text-xs text-white ${
                            product.condition === "usado"
                              ? "bg-[#3e3ff5]"
                              : "bg-green-500"
                          }`}
                        >
                          {product.condition}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {product.memory} GB
                        </span>
                      </div>
                      <p className="font-bold text-lg">${product.price}</p>
                    </CardContent>

                    <Link
                      href={`/detalles/${categoria}/${product._id}`}
                      passHref
                      className="p-0 pt-0 mt-auto w-full"
                    >
                      <Button className="w-full text-sm h-10 cursor-pointer mt-2 bg-[#1f1f1f] text-white hover:bg-[#333] active:bg-[#111] transition-all duration-200">
                        Ver detalles
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })
          ) : (
            <Alert className="bg-red-100 text-red-600 border-red-400 p-4 rounded-lg">
              <AlertDescription>Ningun producto disponible</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
