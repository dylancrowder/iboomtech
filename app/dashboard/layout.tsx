"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  ShipIcon as LocalShipping,
  Package,
  PlusCircle,
  ShoppingCart,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import logo from "../../assets/imagenes/logotipo/LOGO-negro-iboom.png";
import type React from "react";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);

  const inventoryItems = [
    { label: "iPhone", path: "/dashboard/editar/iphone" },
    { label: "iPad", path: "/dashboard/editar/ipad" },
    { label: "MacBook", path: "/dashboard/editar/macbook" },
    { label: "Android", path: "/dashboard/editar/android" },
    { label: "Accesorios", path: "/dashboard/editar/accesorios" },
  ];

  return (
    <SidebarProvider>
      <div className="flex  w-screen">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/">
                        <Image src={logo} alt="logo" width={170}></Image>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Ventas</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/envios">
                        <LocalShipping className="h-4 w-4" />
                        <span>Envíos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/ventas">
                        <ShoppingCart className="h-4 w-4" />
                        <span>Ventas</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Inventario (Inventory) Section */}
            <SidebarGroup>
              <SidebarGroupLabel>Inventario</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {/* Collapsible Inventory Edit Section */}
                  <Collapsible
                    open={isInventoryOpen}
                    onOpenChange={setIsInventoryOpen}
                    className="w-full"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <Package className="h-4 w-4" />
                          <span>Editar</span>
                          {isInventoryOpen ? (
                            <ChevronUp className="ml-auto h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-auto h-4 w-4" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    </SidebarMenuItem>
                    <CollapsibleContent>
                      <div className="pl-4 pt-1">
                        {inventoryItems.map((item) => (
                          <SidebarMenuItem key={item.path}>
                            <SidebarMenuButton asChild size="sm">
                              <Link href={item.path}>
                                <span>{item.label}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Collapsible Add Stock Section */}
                  <Collapsible
                    open={isStockOpen}
                    onOpenChange={setIsStockOpen}
                    className="w-full"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <PlusCircle className="h-4 w-4" />
                          <span>Añadir Stock</span>
                          {isStockOpen ? (
                            <ChevronUp className="ml-auto h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-auto h-4 w-4" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    </SidebarMenuItem>
                    <CollapsibleContent>
                      <div className="pl-4 pt-1">
                        {inventoryItems.map((item) => (
                          <SidebarMenuItem key={item.path}>
                            <SidebarMenuButton asChild size="sm">
                              <Link
                                href={`/dashboard/agregarstock${item.path.replace(
                                  "/dashboard/editar",
                                  ""
                                )}`}
                              >
                                <span>{item.label}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1  p-4 flex items-center justify-center ">{children}</main>
      </div>
    </SidebarProvider>
  );
}
