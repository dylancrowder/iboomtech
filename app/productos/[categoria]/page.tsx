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

// Importación de imágenes

//iphone X
import iphone_x_grisEspacial from "../../../assets/imagenes/imagenes-iphones/iphone-x/iphone-x-black.jpg";
import iphone_x_plata from "../../../assets/imagenes/imagenes-iphones/iphone-x/iphone-x-gris.jpg";
//iphone XR
import iphone_xr_azul from "../../../assets/imagenes/imagenes-iphones/iphone-xr/iphone-xr-azul.jpg";
import iphone_xr_blanco from "../../../assets/imagenes/imagenes-iphones/iphone-xr/iphone-xr-blanco.jpg";
import iphone_xr_amarillo from "../../../assets/imagenes/imagenes-iphones/iphone-xr/iphone-xr-amarillo.jpg";
import iphone_xr_coral from "../../../assets/imagenes/imagenes-iphones/iphone-xr/iphone-xr-coral.jpg";
import iphone_xr_negro from "../../../assets/imagenes/imagenes-iphones/iphone-xr/iphone-xr-negro.jpg";
import iphone_xr_rojo from "../../../assets/imagenes/imagenes-iphones/iphone-xr/iphone-xr-rojo.jpg";
//iphone 11
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

//iphone 13 pro
import iphone_13pro_grafito from "../../../assets/imagenes/imagenes-iphones/iphone-13/iphone-13pro-grafito.jpg";
import iphone_13pro_plata from "../../../assets/imagenes/imagenes-iphones/iphone-13/iphone-13pro-plata.jpg";
import iphone_13pro_oro from "../../../assets/imagenes/imagenes-iphones/iphone-13/iphone-13pro-oro.jpg";
import iphone_13pro_azulSierra from "../../../assets/imagenes/imagenes-iphones/iphone-13/iphone-13pro-azulSierra.jpg";
import iphone_13pro_verdeAlpino from "../../../assets/imagenes/imagenes-iphones/iphone-13/iphone-13pro-verdeAlpino.jpg";

//iphone 14
import iphone_14_azul from "../../../assets/imagenes/imagenes-iphones/iphone-14/iphone-14-azul.jpg";
import iphone_14_rojo from "../../../assets/imagenes/imagenes-iphones/iphone-14/iphone-14-rojo.jpg";
import iphone_14_negro from "../../../assets/imagenes/imagenes-iphones/iphone-14/iphone-14-negro.jpg";
import iphone_14_blanco from "../../../assets/imagenes/imagenes-iphones/iphone-14/iphone-14-blanco.jpg";
import iphone_14_morado from "../../../assets/imagenes/imagenes-iphones/iphone-14/iphone-14-morado.jpg";

//iphone 14pro
import iphone_14pro_negro from "../../../assets/imagenes/imagenes-iphones/iphone-14/iphone-14pro-negro.jpg";
import iphone_14pro_plata from "../../../assets/imagenes/imagenes-iphones/iphone-14/iphone-14pro-plata.jpg";
import iphone_14pro_oro from "../../../assets/imagenes/imagenes-iphones/iphone-14/iphone-14pro-oro.jpg";
import iphone_14pro_morado from "../../../assets/imagenes/imagenes-iphones/iphone-14/iphone-14pro-purpura.jpg";

//iphone 15
import iphone_15_amarillo from "../../../assets/imagenes/imagenes-iphones/iphone-15/iphone-15-amarillo.jpg";
import iphone_15_verde from "../../../assets/imagenes/imagenes-iphones/iphone-15/iphone-15-verde.jpg";
import iphone_15_azul from "../../../assets/imagenes/imagenes-iphones/iphone-15/iphone-15-azul.jpg";
import iphone_15_pink from "../../../assets/imagenes/imagenes-iphones/iphone-15/iphone-15-rosa.jpg";
import iphone_15_negro from "../../../assets/imagenes/imagenes-iphones/iphone-15/iphone-15-negro.jpg";

//iphone 15 pro
import iphone_15pro_negro from "../../../assets/imagenes/imagenes-iphones/iphone-15/iphone-15pro-negro.jpg";
import iphone_15pro_blanco from "../../../assets/imagenes/imagenes-iphones/iphone-15/iphone-15pro-blanco.jpg";
import iphone_15pro_oro from "../../../assets/imagenes/imagenes-iphones/iphone-15/iphone-15pro-oro.jpg";
import iphone_15pro_azul from "../../../assets/imagenes/imagenes-iphones/iphone-15/iphone-15pro-azul.jpg";

//iphone 16
import iphone_16_azul from "../../../assets/imagenes/imagenes-iphones/iphone-16/iphone-16-azul.jpg";
import iphone_16_verde from "../../../assets/imagenes/imagenes-iphones/iphone-16/iphone-16-verde.jpg";
import iphone_16_rosa from "../../../assets/imagenes/imagenes-iphones/iphone-16/iphone-16-rosa.jpg";
import iphone_16_blanco from "../../../assets/imagenes/imagenes-iphones/iphone-16/iphone-16-blanco.jpg";
import iphone_16_negro from "../../../assets/imagenes/imagenes-iphones/iphone-16/iphone-16-negro.jpg";

//iphone 16 pro
import iphone_16pro_negro from "../../../assets/imagenes/imagenes-iphones/iphone-16/iphone-16pro-negro.jpg";
import iphone_16pro_blanco from "../../../assets/imagenes/imagenes-iphones/iphone-16/iphone-16pro-blanco.jpg";
import iphone_16pro_titanio from "../../../assets/imagenes/imagenes-iphones/iphone-16/iphone-16pro-titanio.jpg";
import iphone_16pro_titanioDesierto from "../../../assets/imagenes/imagenes-iphones/iphone-16/iphone-16pro-titanioDesierto.jpg";

//iphone 16 e

import iphone_16e_blanco from "../../../assets/imagenes/imagenes-iphones/iphone-16/iphone-16e-blanco.jpg";
import iphone_16e_negro from "../../../assets/imagenes/imagenes-iphones/iphone-16/iphone-16e-negro.jpg";

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
  //iphone 12 mini
  "iPhone 12 Mini-Azul": iphone_12_azul,
  "iPhone 12 Mini-Negro": iphone_12_negro,
  "iPhone 12 Mini-Rojo": iphone_12_rojo,
  "iPhone 12 Mini-Blanco": iphone_12_blanco,
  "iPhone 12 Mini-Verde": iphone_12_verde,
  "iPhone 12 Mini-Morado": iphone_12_morado,
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
  //iphone 13 mini
  "iPhone 13 Mini-Rojo": iphone_13_rojo,
  "iPhone 13 Mini-Azul": iphone_13_azul,
  "iPhone 13 Mini-Negro": iphone_13_negro,
  "iPhone 13 Mini-Blanco": iphone_13_blanco,
  "iPhone 13 Mini-Verde": iphone_13_verde,
  "iPhone 13 Mini-Rosa": iphone_13_rosa,
  //iphone 13 pro
  "iPhone 13 Pro-Grafito": iphone_13pro_grafito,
  "iPhone 13 Pro-Plata": iphone_13pro_plata,
  "iPhone 13 Pro-Oro": iphone_13pro_oro,
  "iPhone 13 Pro-Azul": iphone_13pro_azulSierra,
  "iPhone 13 Pro-Verde": iphone_13pro_verdeAlpino,
  //iphone 13 pro max
  "iPhone 13 Pro Max-Grafito": iphone_13pro_grafito,
  "iPhone 13 Pro Max-Plata": iphone_13pro_plata,
  "iPhone 13 Pro Max-Oro": iphone_13pro_oro,
  "iPhone 13 Pro Max-Azul": iphone_13pro_azulSierra,
  "iPhone 13 Pro Max-Verde": iphone_13pro_verdeAlpino,
  //iphone 14
  "iPhone 14-Azul": iphone_14_azul,
  "iPhone 14-Rojo": iphone_14_rojo,
  "iPhone 14-Negro": iphone_14_negro,
  "iPhone 14-Blanco": iphone_14_blanco,
  "iPhone 14-Morado": iphone_14_morado,

  //iphone 14 plus
  "iPhone 14 Plus-Azul": iphone_14_azul,
  "iPhone 14 Plus-Rojo": iphone_14_rojo,
  "iPhone 14 Plus-Negro": iphone_14_negro,
  "iPhone 14 Plus-Blanco": iphone_14_blanco,
  "iPhone 14 Plus-Morado": iphone_14_morado,

  //iphone 14 pro
  "iPhone 14 Pro -Negro": iphone_14pro_negro,
  "iPhone 14 Pro -Plata": iphone_14pro_plata,
  "iPhone 14 Pro -Oro": iphone_14pro_oro,
  "iPhone 14 Pro -Morado": iphone_14pro_morado,
  //iphone 14 pro max
  "iPhone 14 Pro Max-Negro": iphone_14pro_negro,
  "iPhone 14 Pro Max-Plata": iphone_14pro_plata,
  "iPhone 14 Pro Max-Oro": iphone_14pro_oro,
  "iPhone 14 Pro Max-Morado": iphone_14pro_morado,
  //iphone 15
  "iPhone 15-Azul": iphone_15_azul,
  "iPhone 15-Negro": iphone_15_negro,
  "iPhone 15-Pink": iphone_15_pink,
  "iPhone 15-Verde": iphone_15_verde,
  "iPhone 15-Amarillo": iphone_15_amarillo,
  //iphone 15 plus
  "iPhone 15 Plus-Azul": iphone_15_azul,
  "iPhone 15 Plus-Negro": iphone_15_negro,
  "iPhone 15 Plus-Pink": iphone_15_pink,
  "iPhone 15 Plus-Verde": iphone_15_verde,
  "iPhone 15 Plus-Amarillo": iphone_15_amarillo,
  //iphone 15 pro
  "iPhone 15 Pro-Azul": iphone_15pro_azul,
  "iPhone 15 Pro-Negro": iphone_15pro_negro,
  "iPhone 15 Pro-Blanco": iphone_15pro_blanco,
  "iPhone 15 Pro-Oro": iphone_15pro_oro,
  //iphone 15 pro max
  "iPhone 15 Pro Max-Azul": iphone_15pro_azul,
  "iPhone 15 Pro Max-Negro": iphone_15pro_negro,
  "iPhone 15 Pro Max-Blanco": iphone_15pro_blanco,
  "iPhone 15 Pro Max-Oro": iphone_15pro_oro,
  //iphone 16
  "iPhone 16-Azul": iphone_16_azul,
  "iPhone 16-Negro": iphone_16_negro,
  "iPhone 16-Rosa": iphone_16_rosa,
  "iPhone 16-Verde": iphone_16_verde,
  "iPhone 16-Blanco": iphone_16_blanco,

  //iphone 16e

  "iPhone 16 e-Blanco": iphone_16e_blanco,
  "iPhone 16 e-Negro": iphone_16e_negro,
  //iphone 16pro

  "iPhone 16 Pro-Titanio Desierto": iphone_16pro_titanioDesierto,
  "iPhone 16 Pro-Negro": iphone_16pro_negro,
  "iPhone 16 Pro-Blanco": iphone_16pro_blanco,
  "iPhone 16 Pro-Titanio": iphone_16pro_titanio,

  iphone_16pro_titanioDesierto,
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
    <div className="flex flex-1 lg:mb-16 ">
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => {
              const key = `${product.model}-${product.color}`;
              const productImage = imageMap[key] || "/default-image.jpg";
              return (
                <Card
                  key={product._id}
                  className="flex flex-col gap-0 h-auto overflow-hidden m-0 p-0 "
                >
                  <div className="relative w-full border flex items-center justify-center h-[290px]">
                    <div className=" max-w-[180px]">
                      <Image
                        src={productImage}
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
                      <Button className="w-full text-sm h-10 cursor-pointer mt-2 bg-[#1f1f1f] text-white hover:bg-[#333]">
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
