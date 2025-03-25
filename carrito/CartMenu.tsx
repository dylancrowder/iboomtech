// components/CartMenu.tsx
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function CartMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hidden sm:flex">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
            3
          </span>
          <span className="sr-only">Carrito de compras</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between pb-4">
            <h2 className="text-lg font-semibold">Carrito de compras</h2>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                Cerrar
              </Button>
            </SheetTrigger>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded bg-muted flex items-center justify-center">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">iPhone 13 Pro</h3>
                  <p className="text-sm text-muted-foreground">1 x $999</p>
                </div>
              </div>
              {/* Más productos... */}
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>$1,267.00</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <div className="flex justify-between py-2 font-medium">
              <span>Total</span>
              <span>$1,267.00</span>
            </div>
            <Button className="w-full mt-4">Finalizar compra</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
