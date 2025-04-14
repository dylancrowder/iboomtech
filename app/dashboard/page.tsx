"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Truck,
  ShoppingCart,
  Settings,
  Smartphone,
  Tablet,
  Monitor,
  Laptop,
  Headphones,
} from "lucide-react";

export default function Dashboard() {
  const categorias = [
    {
      nombre: "iPhone",
      icon: <Smartphone className="h-4 w-4" />,
      href: "/stock/iphone",
    },
    {
      nombre: "iPad",
      icon: <Tablet className="h-4 w-4" />,
      href: "/stock/ipad",
    },
    {
      nombre: "Android",
      icon: <Monitor className="h-4 w-4" />,
      href: "/stock/android",
    },
    {
      nombre: "MacBook",
      icon: <Laptop className="h-4 w-4" />,
      href: "/stock/macbook",
    },
    {
      nombre: "Accesorios",
      icon: <Headphones className="h-4 w-4" />,
      href: "/stock/accesorios",
    },
  ];

  const categoriasEdicion = categorias.map((cat) => ({
    ...cat,
    href: cat.href.replace("/stock", "/editar-productos"),
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-muted-foreground mb-6">Bienvenido a tu panel</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* Agregar Stock */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-6 w-6 text-primary" />
              Agregar Stock
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {categorias.map((cat) => (
              <Link
                key={cat.nombre}
                href={cat.href}
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                {cat.icon}
                {cat.nombre}
              </Link>
            ))}
          </CardContent>
        </Card>
        {/* Editar Productos */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6 text-primary" />
              Editar Productos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {categoriasEdicion.map((cat) => (
              <Link
                key={cat.nombre}
                href={cat.href}
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                {cat.icon}
                {cat.nombre}
              </Link>
            ))}
          </CardContent>
        </Card>
        {/* Envíos */}
        <Link href="/dashboard/envios">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-6 w-6 text-primary" />
                Envíos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Gestionar envíos</p>
            </CardContent>
          </Card>
        </Link>

        {/* Ventas */}
        <Link href="dashboard/ventas">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-primary" />
                Ventas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ver historial de ventas
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
