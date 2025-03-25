"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import CartMenu from "./CartMenu";
import UserMenu from "./UserMenu";
import Image from "next/image";
import { usePathname } from "next/navigation";

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

    const pathname = usePathname(); // Obtener la ruta actual
  
    // Si la ruta comienza con "/dashboard", no se renderiza el Footer
    if (pathname.startsWith("/dashboard")) {
      return null; // No renderizar el Footer
    }
  return (
    <div className="container flex h-16 items-center justify-center w-full px-4 md:w-[90%] md:px-0   bg-white">
      <div className="flex items-center justify-between w-full md:justify-start">
        {/* Logo */}
        <Link href="/" className="mr-4 flex-shrink-0 mb-2">
          {/* Placeholder for logo - replace with your actual logo */}
          <div className="h-8 w-32 md:h-10 md:w-50 flex items-center ">
            <Image src={logo} alt="logo"></Image>
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

            <NavigationMenuItem>
              <Button variant="ghost" asChild className="px-4">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-1 md:gap-2">
        <div className="hidden sm:block ">
          <UserMenu />
        </div>
        <div className="hidden sm:block">
          <CartMenu />
        </div>

        {/* Mobile menu button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            {/* Mobile Menu Content */}
            <div className="flex flex-col gap-4 py-4">
              <div className="flex justify-between items-center mb-4">
                <div className="sm:hidden flex gap-2">
                  <UserMenu  />
                  <CartMenu />
                </div>
              </div>

              <Link
                href="/productos"
                className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Productos
              </Link>
              <Link
                href="/contacto"
                className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>

              <div className="px-4 pt-4 pb-2 font-medium">Categorías</div>
              {products.map((product) => (
                <Link
                  key={product.title}
                  href={product.href}
                  className="px-4 py-2 text-sm hover:bg-accent rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {product.title}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Nav;
