"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams } from "next/navigation";


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
    <div className="min-h-screen bg-gray-100 p-8">
      <Breadcrumb>
        <BreadcrumbItem><Link href="/dashboard">Dashboard</Link></BreadcrumbItem>
        <BreadcrumbItem><Link href="/dashboard/inventario">Inventario</Link></BreadcrumbItem>
        <BreadcrumbItem>iPhone</BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-wrap gap-4 mb-4 items-center justify-between">
        {Object.keys(availableFilters).map((filter) => (
          <Select key={filter} onValueChange={(value) => handleFilterSelect(filter as FilterKey, value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder={filter} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {availableFilters[filter as FilterKey].map((value) => (
                <SelectItem key={value} value={value}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        <Select onValueChange={(value) => {
          setSortBy("price");
          setSortOrder(value as "asc" | "desc");
        }}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Precio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascendente</SelectItem>
            <SelectItem value="desc">Descendente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {iphones.map((iphone) => (
          <Card key={iphone._id} className="shadow-md">
     {/*        <Image src={img} alt={iphone.model} width={200} height={200} /> */}
            <CardContent>
              <p className="text-lg font-semibold">{iphone.model}</p>
              <p className="text-gray-600">Color: {iphone.color}</p>
              <p className="text-gray-600">Memoria: {iphone.memory}</p>
              <p className="text-gray-600">Condición: {iphone.condition}</p>
              <p className="text-lg font-semibold">${iphone.price}</p>
              <p className="text-gray-600">Batería: {iphone.batteryStatus}%</p>
              <Link href={`/dashboard/editar/${categoria}/${iphone._id}`}>
                <Button className="w-full mt-2">Editar</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
