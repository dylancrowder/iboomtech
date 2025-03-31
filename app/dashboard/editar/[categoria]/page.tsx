/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Filter } from "lucide-react";

type FilterKey = "model" | "color" | "memory" | "condition";
type SortField = "price" | "batteryStatus" | "";

interface Iphone {
  _id: string;
  model: string;
  color: string;
  memory: string;
  condition: string;
  price: number;
  batteryStatus: number;
}

export default function ProductosPage() {
  const [iphones, setIphones] = useState<Iphone[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    model: "all",
    color: "all",
    memory: "all",
    condition: "all",
  });
  const { categoria } = useParams();

  const [sortBy, setSortBy] = useState<SortField>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchIphones = async () => {
      setLoading(true);
      try {
        const filters = new URLSearchParams(
          Object.entries(selectedFilters)
            .filter(([_, value]) => value !== "all")
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
        );
        if (sortBy) {
          filters.append("sortBy", sortBy);
          filters.append("sortOrder", sortOrder);
        }

        const response = await fetch(
          `http://localhost:8085/dashboard/get-all?${filters.toString()}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los iPhones");
        }
        const data = await response.json();
        setIphones(data);
      } catch (error) {
        setError("No se pudo cargar la información de los iPhones.");
      } finally {
        setLoading(false);
      }
    };
    fetchIphones();
  }, [selectedFilters, sortBy, sortOrder]);

  const handleFilterSelect = (filter: FilterKey, value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value,
    }));
  };

  const availableFilters = useMemo(() => {
    return {
      model: Array.from(new Set(iphones.map((iphone) => iphone.model))),
      color: Array.from(new Set(iphones.map((iphone) => iphone.color))),
      memory: Array.from(new Set(iphones.map((iphone) => iphone.memory))),
      condition: Array.from(new Set(iphones.map((iphone) => iphone.condition))),
    };
  }, [iphones]);

  if (loading) return <div className="text-center p-6">Cargando...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="flex flex flex-col  mt-[80px] lg:mt-[0px]">
      <div className=" py-6 bg-gray-100 lg:border-b lg:border-gray-500  ">
        <div className="flex  justify-center ">
          <span className="font text-[1.5rem] p-2 text-bold font-medium  ">
            Editar iPhones
          </span>
        </div>
      </div>
      <div className="min-h-screen w-full  lg:p-8 ">
        <h2 className="mb-1  text-[1rem] flex items-center gap-2 pt-6 lg:pt-0">
          <Filter className="w-4 h-4" />
          Filtros
        </h2>
        {/* acas */}
        <div className=" border shadow-md mb-8 p-6">
          <div className="flex flex-col sm:flex-row w-full gap-6  ">
            {Object.keys(availableFilters).map((filter) => (
              <div key={filter} className="w-full">
                <p className="text-sm font-medium capitalize mb-1">{filter}</p>
                <Select
                  onValueChange={(value) =>
                    handleFilterSelect(filter as FilterKey, value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Seleccionar ${filter}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {availableFilters[filter as FilterKey].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}

            <div className="w-full">
              <p className="text-sm font-medium mb-1">Ordenar por precio</p>
              <Select
                onValueChange={(value) => {
                  setSortBy("price");
                  setSortOrder(value as "asc" | "desc");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascendente</SelectItem>
                  <SelectItem value="desc">Descendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {iphones.map((iphone) => (
            <Card key={iphone._id} className="shadow-md">
              <CardContent>
                <p className="text-lg font-semibold">{iphone.model}</p>
                <p className="text-gray-600">Color: {iphone.color}</p>
                <p className="text-gray-600">Memoria: {iphone.memory}</p>
                <p className="text-gray-600">Condición: {iphone.condition}</p>
                <p className="text-lg font-semibold">${iphone.price}</p>
                <p className="text-gray-600">
                  Batería: {iphone.batteryStatus}%
                </p>
                <Link href={`/dashboard/editar/${categoria}/${iphone._id}`}>
                  <Button className="w-full mt-2">Editar</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
