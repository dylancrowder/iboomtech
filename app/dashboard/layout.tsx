/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  ShipIcon as LocalShipping,
  Package,
  PlusCircle,
  ShoppingCart,
  Home,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

import useAuthStore from "@/zustand/useAuthStore";
import { useSessionCheck } from "@/hooks/Verify";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeItemStock, setActiveItemStock] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const inventoryItems = [
    { label: "iPhone", path: "/dashboard/editar/iphone" },
    { label: "iPad", path: "/dashboard/editar/ipad" },
    { label: "MacBook", path: "/dashboard/editar/macbook" },
    { label: "Android", path: "/dashboard/editar/android" },
    { label: "Accesorios", path: "/dashboard/editar/accesorios" },
  ];
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  useSessionCheck();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    } else {
      setLoading(false);
      router.replace(pathname);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const matchingInventoryItem = inventoryItems.find(
      (item) => pathname === item.path
    );

    const matchingStockItem = inventoryItems.find(
      (item) =>
        pathname ===
        `/dashboard/agregarstock${item.path.replace("/dashboard/editar", "")}`
    );

    if (matchingInventoryItem) {
      setIsInventoryOpen(true);
      setIsStockOpen(false);
      setActiveItem(matchingInventoryItem.path);
    } else if (matchingStockItem) {
      setIsStockOpen(true);
      setIsInventoryOpen(false);
      setActiveItemStock(matchingStockItem.path);
    }
  }, [pathname]);

  if (loading) return null;
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar variant="sidebar" collapsible="offcanvas" className="border-r">
          <SidebarHeader className="flex flex-col gap-0 px-3 py-2">
            <div className="flex items-center justify-center py-2">
              <Link href="/" className="flex items-center justify-center">
                <div className="h-10 w-32 bg-muted flex items-center justify-center rounded">
                  <span className="font-semibold text-primary">IBOOM</span>
                </div>
              </Link>
            </div>
            <Separator className="my-2" />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="hover:text-primary">
                      <Link
                        href="/dashboard"
                        className={
                          pathname === "/dashboard"
                            ? "text-primary font-medium"
                            : ""
                        }
                      >
                        <Home className="h-4 w-4" />
                        <span>Dashboard</span>
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
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard/envios"}
                      className="hover:text-primary"
                    >
                      <Link href="/dashboard/envios">
                        <LocalShipping className="h-4 w-4" />
                        <span>Envíos</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/dashboard/ventas"}
                      className="hover:text-primary"
                    >
                      <Link href="/dashboard/ventas">
                        <ShoppingCart className="h-4 w-4" />
                        <span>Ventas</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Inventario</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Collapsible
                    open={isInventoryOpen}
                    onOpenChange={(open) => {
                      setIsInventoryOpen(open);
                      if (open) setIsStockOpen(false);
                    }}
                    className="w-full"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={isInventoryOpen}
                          className="hover:text-primary"
                        >
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
                      <div className="pl-4 pt-1 my-2 space-y-1">
                        {inventoryItems.map((item) => (
                          <SidebarMenuItem key={item.path}>
                            <SidebarMenuButton
                              asChild
                              size="sm"
                              isActive={activeItem === item.path}
                            >
                              <Link
                                href={item.path}
                                className="hover:text-primary"
                              >
                                <span>{item.label}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible
                    open={isStockOpen}
                    onOpenChange={(open) => {
                      setIsStockOpen(open);
                      if (open) setIsInventoryOpen(false);
                    }}
                    className="w-full"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={isStockOpen}
                          className="hover:text-primary"
                        >
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
                      <div className="pl-4 pt-1 my-2 space-y-1">
                        {inventoryItems.map((item) => (
                          <SidebarMenuItem key={`stock-${item.path}`}>
                            <SidebarMenuButton
                              asChild
                              size="sm"
                              isActive={activeItemStock === item.path}
                            >
                              <Link
                                href={`/dashboard/agregarstock${item.path.replace(
                                  "/dashboard/editar",
                                  ""
                                )}`}
                                className="hover:text-primary"
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

          <SidebarFooter className="border-t p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                © IBOOM {new Date().getFullYear()}
              </span>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
            <SidebarTrigger />
            <div className="flex-1" />
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
