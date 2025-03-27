/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProductStores } from "@/zustand/filtro-data";
import useFilterStore from "@/zustand/filtro-productos";

// Importación de imágenes
import iphone_x_grisEspacial from "../../../assets/imagenes/imagenes-iphones/iphone-x/iphone-x-black.jpg";
import iphone_x_plata from "../../../assets/imagenes/imagenes-iphones/iphone-x/iphone-x-gris.jpg";
//XR
import iphone_xr_azul from "../../../assets/imagenes/imagenes-iphones/iphone-xr/iphone-xr-azul.jpg";
import iphone_xr_blanco from "../../../assets/imagenes/imagenes-iphones/iphone-xr/iphone-xr-blanco.jpg";
import iphone_xr_amarillo from "../../../assets/imagenes/imagenes-iphones/iphone-xr/iphone-xr-amarillo.jpg";
import iphone_xr_coral from "../../../assets/imagenes/imagenes-iphones/iphone-xr/iphone-xr-coral.jpg";
import iphone_xr_negro from "../../../assets/imagenes/imagenes-iphones/iphone-xr/iphone-xr-negro.jpg";
import iphone_xr_rojo from "../../../assets/imagenes/imagenes-iphones/iphone-xr/iphone-xr-rojo.jpg";
//11
import iphone_11_rojo from "../../../assets/imagenes/imagenes-iphones/iphone-11/iphone-11-negro.jpg";
import iphone_11_amarillo from "../../../assets/imagenes/imagenes-iphones/iphone-11/iphone-11-amarillo.jpg";
import iphone_11_blanco from "../../../assets/imagenes/imagenes-iphones/iphone-11/iphone-11-blanco.jpg";
import iphone_11_verde from "../../../assets/imagenes/imagenes-iphones/iphone-11/iphone-11-verde.jpg";
import iphone_11_morado from "../../../assets/imagenes/imagenes-iphones/iphone-11/iphone-11-morado.jpg";
import iphone_11_negro from "../../../assets/imagenes/imagenes-iphones/iphone-11/iphone-11-negro.jpg";
//iphone 11 pro
import iphone_11pro_grisEspacial from "../../../assets/imagenes/imagenes-iphones/iphone-11/iphone-11pro-grisEspacial.jpg";
import iphone_11pro_oro from "../../../assets/imagenes/imagenes-iphones/iphone-11/iphone-11pro-oro.jpg";
import iphone_11pro_plata from "../../../assets/imagenes/imagenes-iphones/iphone-11/iphone-11pro-plata.jpg";
import iphone_11pro_verdeNoche from "../../../assets/imagenes/imagenes-iphones/iphone-11/iphone-11pro-verdeNoche.jpg";
//iphone 12
import iphone_12_azul from "../../../assets/imagenes/imagenes-iphones/iphone-12/iphone-12-azul.jpg";
import iphone_12_rojo from "../../../assets/imagenes/imagenes-iphones/iphone-12/iphone-12-rojo.jpg";
import iphone_12_blanco from "../../../assets/imagenes/imagenes-iphones/iphone-12/iphone-12-blanco.jpg";
import iphone_12_negro from "../../../assets/imagenes/imagenes-iphones/iphone-12/iphone-12-negro.jpg";
import iphone_12_verde from "../../../assets/imagenes/imagenes-iphones/iphone-12/iphone-12-verde.jpg";
import iphone_12_morado from "../../../assets/imagenes/imagenes-iphones/iphone-12/iphone-12-morado.jpg";
//iphone 12 pro
import iphone_12pro_grafito from "../../../assets/imagenes/imagenes-iphones/iphone-12/iphone-12pro-grafito.jpg";
import iphone_12pro_oro from "../../../assets/imagenes/imagenes-iphones/iphone-12/iphone-12pro-oro.jpg";
import iphone_12pro_plata from "../../../assets/imagenes/imagenes-iphones/iphone-12/iphone-12pro-plata.jpg";
import iphone_12pro_azulPacifico from "../../../assets/imagenes/imagenes-iphones/iphone-12/iphone-12pro-azulPacifico.jpg";

//iphone 13
import iphone_13_rojo from "../../../assets/imagenes/imagenes-iphones/iphone-13/iphone-13-rojo.jpg";
import iphone_13_azul from "../../../assets/imagenes/imagenes-iphones/iphone-13/iphone-13-azul.jpg";
import iphone_13_blanco from "../../../assets/imagenes/imagenes-iphones/iphone-13/iphone-13-blanco.jpg";
import iphone_13_negro from "../../../assets/imagenes/imagenes-iphones/iphone-13/iphone-13-medianoche.jpg";
import iphone_13_verde from "../../../assets/imagenes/imagenes-iphones/iphone-13/iphone-13-verde.jpg";
import iphone_13_rosa from "../../../assets/imagenes/imagenes-iphones/iphone-13/iphone-13-rosa.jpg";

// Mapeo de imágenes según modelo y color
const imageMap: { [key: string]: any } = {
  //iphone X
  "iPhone X-Plata": iphone_x_plata,
  "iPhone X-Gris espacial": iphone_x_grisEspacial,
  //iphone XR
  "iPhone XR-Azul": iphone_xr_azul,
  "iPhone XR-Blanco": iphone_xr_blanco,
  "iPhone XR-Amarillo": iphone_xr_amarillo,
  "iPhone XR-Coral": iphone_xr_coral,
  "iPhone XR-Rojo": iphone_xr_rojo,
  "iPhone XR-Negro": iphone_xr_negro,
  //iphone 11
  "iPhone 11-Negro": iphone_11_negro,
  "iPhone 11-Rojo": iphone_11_rojo,
  "iPhone 11-Amarillo": iphone_11_amarillo,
  "iPhone 11-Blanco": iphone_11_blanco,
  "iPhone 11-Verde": iphone_11_verde,
  "iPhone 11-Morado": iphone_11_morado,
  //iphone 11 pro
  "iPhone 11 Pro-Gris espacial": iphone_11pro_grisEspacial,
  "iPhone 11 Pro-Oro": iphone_11pro_oro,
  "iPhone 11 Pro-Plata": iphone_11pro_plata,
  "iPhone 11 Pro-Verde Noche": iphone_11pro_verdeNoche,
  //iphone 11 pro max
  "iPhone 11 Pro Max-Gris espacial": iphone_11pro_grisEspacial,
  "iPhone 11 Pro Max-Oro": iphone_11pro_oro,
  "iPhone 11 Pro Max-Plata": iphone_11pro_plata,
  "iPhone 11 Pro Max-Verde Noche": iphone_11pro_verdeNoche,
  //iphone 12
  "iPhone 12-Azul": iphone_12_azul,
  "iPhone 12-Negro": iphone_12_negro,
  "iPhone 12-Rojo": iphone_12_rojo,
  "iPhone 12-Blanco": iphone_12_blanco,
  "iPhone 12-Verde": iphone_12_verde,
  "iPhone 12-Morado": iphone_12_morado,
  //iphone 12 pro
  "iPhone 12 Pro-Grafito": iphone_12pro_grafito,
  "iPhone 12 Pro-Oro": iphone_12pro_oro,
  "iPhone 12 Pro-Plata": iphone_12pro_plata,
  "iPhone 12 Pro-Azul Pacífico": iphone_12pro_azulPacifico,
  //iphone 12 pro max
  "iPhone 12 Pro Max-Grafito": iphone_12pro_grafito,
  "iPhone 12 Pro Max-Oro": iphone_12pro_oro,
  "iPhone 12 Pro Max-Plata": iphone_12pro_plata,
  "iPhone 12 Pro Max-Azul Pacífico": iphone_12pro_azulPacifico,
  //iphone 13
  "iPhone 13-Rojo": iphone_13_rojo,
  "iPhone 13-Azul": iphone_13_azul,
  "iPhone 13-Negro": iphone_13_negro,
  "iPhone 13-Blanco": iphone_13_blanco,
  "iPhone 13-Verde": iphone_13_verde,
  "iPhone 13-Rosa": iphone_13_rosa,
  //iphone 13 pro
  
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { model, color, memory, sortOrder, setCategory } = useFilterStore();
  const { setProductsData } = useProductStores();
  const { categoria } = useParams();

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

    fetchProducts();
  }, [
    model,
    color,
    memory,
    categoria,
    sortOrder,
    setProductsData,
    setCategory,
  ]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-1">
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {products.length > 0 ? (
            products.map((product) => {
              const key = `${product.model}-${product.color}`;
              const productImage = imageMap[key] || "/default-image.jpg"; // Imagen por defecto si no hay coincidencia
              return (
                <Card
                  key={product._id}
                  className="flex flex-col gap-0 h-auto overflow-hidden m-0 p-0 "
                >
                  <div className="relative w-full border flex items-end justify-center  h-[300px]">
                    <div className="pb-4 max-w-[180px]">
                      <Image
                        src={productImage}
                        alt={`${product.model} ${product.color}`}
                        width={200}
                        height={200}
                        className="object-cover"
                      />
                    </div>
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
                      <Button className="w-full text-sm h-10 cursor-pointer">
                        Ver detalles
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })
          ) : (
            <div>No products available</div>
          )}
        </div>
      </div>
    </div>
  );
}
