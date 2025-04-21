"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home, Menu, Phone, ShoppingBag } from "lucide-react";
import logo from "../../assets/imagenes/logotipo/LOGO-negro-iboom.png";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import CartMenu from "./CartMenu";
import UserMenu from "./UserMenu";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useAuthStore from "@/zustand/useAuthStore";
import { Separator } from "@/components/ui/separator";

const products = [
  {
    title: "iPhones",
    href: "/productos/iphone",
    description: "Descubre la última generación de iPhones",
  },
  {
    title: "Android",
    href: "/productos/android",
    description: "Explora nuestra selección de smartphones Android",
  },
  {
    title: "Accesorios",
    href: "/productos/accesorios",
    description: "Complementos y accesorios para tus dispositivos",
  },
  {
    title: "MacBooks",
    href: "/productos/macbooks",
    description: "Potentes laptops para trabajo y creatividad",
  },
  {
    title: "iPads",
    href: "/productos/ipads",
    description: "Tablets versátiles para todo tipo de usuarios",
  },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/checkout")) {
    return null;
  }

  return (
    <div className="flex h-16 items-center justify-center w-full px-4 md:w-[90%] md:px-0 bg-white">
      <div className="flex items-center justify-between w-full md:justify-start">
        {/* Logo */}
        <Link href="/" className="mr-4 flex-shrink-0 mb-2">
          <div className="h-8 w-32 md:h-10 md:w-50 flex items-center ">
            <Image src={logo} alt="logo" priority />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="cursor-pointer">
                Productos
              </NavigationMenuTrigger>

              <NavigationMenuContent className="bg-white">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {products.map((product) => (
                    <li
                      key={product.title}
                      className="transition-colors duration-200 hover:bg-gray-100"
                    >
                      <NavigationMenuLink asChild>
                        <Link
                          href={product.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none"
                        >
                          <div className="text-sm font-medium leading-none">
                            {product.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {product.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Button variant="ghost" asChild className="px-4">
                <Link href="/contacto">Contacto</Link>
              </Button>
            </NavigationMenuItem>

            {/* Solo mostrar si está autenticado */}
            {isAuthenticated && (
              <NavigationMenuItem>
                <Button variant="ghost" asChild className="px-4">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1 md:gap-2">
        <div className="hidden sm:block ">
          <UserMenu setIsOpene={setIsOpen} />
        </div>
        <div className="hidden sm:block">
          <CartMenu />
        </div>

        {/* Mobile menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] sm:w-[400px] p-0">
            <SheetHeader className="p-4 border-b">
              <SheetTitle className="text-left">Menú</SheetTitle>
            </SheetHeader>

            <div className="flex justify-between items-center p-4 bg-muted/30">
              <div className="sm:hidden flex gap-2 w-full justify-between">
                <UserMenu setIsOpene={setIsOpen} />
                <CartMenu />
              </div>
            </div>

            <div className="p-4">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-accent rounded-md mb-1"
                onClick={() => setIsOpen(false)}
              >
                <Home size={18} />
                <span>Inicio</span>
              </Link>

              <Link
                href="/contacto"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <Phone size={18} />
                <span>Contacto</span>
              </Link>

              {/* Solo mostrar si está autenticado */}
              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-accent rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBag size={18} />
                  <span>Dashboard</span>
                </Link>
              )}
            </div>

            <Separator />

            {/* Categorías */}
            <div className="p-4">
              <h3 className="font-medium text-sm text-muted-foreground mb-2 px-4">
                CATEGORÍAS
              </h3>
              <div className="space-y-1">
                {products.map((product) => (
                  <Link
                    key={product.title}
                    href={product.href}
                    className="flex items-center justify-between px-4 py-3 text-sm hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">
                        {product.title}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Nav;
