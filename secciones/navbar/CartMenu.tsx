"use client"

import { ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCarritoStore } from "@/zustand/carritoStore";

export default function CartMenu() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarritoStore();

  const cartTotal = carrito.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <ShoppingCart className="h-5 w-5" />
          {carrito.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {carrito.length}
            </span>
          )}
          <span className="sr-only">Carrito de compras</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Mi carrito</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {carrito.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">Tu carrito está vacío</div>
        ) : (
          <>
            <div className="max-h-80 overflow-auto p-2">
              {carrito.map((item) => (
                <div key={item._id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="text-sm font-medium">{item.model} - {item.memory}GB</p>
                    <p className="text-xs text-muted-foreground">Estado: {item.condition} | Batería: {item.batteryStatus}%</p>
                    <p className="text-xs text-muted-foreground">{item.quantity} x ${item.price.toFixed(2)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => eliminarDelCarrito(item._id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
            <DropdownMenuSeparator />
            <div className="p-4">
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Button asChild className="mt-4 w-full">
                <Link href="/checkout">Proceder al pago</Link>
              </Button>
              <Button variant="destructive" className="mt-2 w-full" onClick={vaciarCarrito}>
                Vaciar Carrito
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}