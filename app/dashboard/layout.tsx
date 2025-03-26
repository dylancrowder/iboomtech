"use client"; // Necesario para la versión móvil

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  ShipIcon as LocalShipping,
  Package,
  PlusCircle,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button"; // Asegúrate de tener un componente Button de ShadCN o usa el que prefieras.
import logo from "../../assets/imagenes/logotipo/LOGO-negro-iboom.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para el sidebar
  const [activeMenu, setActiveMenu] = useState<"inventory" | "stock" | null>(
    null
  );
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeItemStock, setActiveItemStock] = useState<string | null>(null);
  const inventoryItems = [
    { label: "iPhone", path: "/dashboard/editar/iphone" },
    { label: "iPad", path: "/dashboard/editar/ipad" },
    { label: "MacBook", path: "/dashboard/editar/macbook" },
    { label: "Android", path: "/dashboard/editar/android" },
    { label: "Accesorios", path: "/dashboard/editar/accesorios" },
  ];

  const handleNavClick = () => {
    setIsSidebarOpen(false);
    setActiveMenu(null);
    setActiveItem(null);
    setActiveItemStock(null);
  };

  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center ">
      <SidebarProvider className="w-[90%] lg:border-r border-gray-700 ">
        <div className="flex w-screen flex-row justify-start items-start">
          {/* Navbar (Solo para dispositivos móviles) */}
          <nav className=" h-[80px] lg:hidden bg-white flex items-center justify-between shadow-md p-4 fixed top-0 left-0 w-full z-20">
            <Link href="/">
              <Image src={logo} alt="logo" width={150} height={40} />
            </Link>
            <Button
              variant="outline"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 block"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </nav>

          {/* Sidebar (Para dispositivos móviles y siempre visible en la versión web) */}
          <div
            className={`fixed top-0 left-0 h-full bg-white w-full p-4 transform transition-transform ease-in-out duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 lg:static lg:w-auto lg:p-0 lg:bg-transparent lg:flex lg:space-x-6 lg:items-center z-50 lg:border-r lg:border-gray-200`}
          >
            <SidebarContent className="h-full sm:w-[250px] lg:bg-gray-100 lg:border-l lg:border-r border-gray-700 ">
              <Button
                onClick={() => setIsSidebarOpen(false)}
                className=" w-[10%] lg:hidden ml-[87%]"
              >
                <X size={18} />
              </Button>
              <SidebarGroup className=" ">
                <SidebarGroupContent>
                  <SidebarMenu className="cursor-pointer">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="py-6 ">
                        <div className="flex hover:!text-[#3e3ff5] justify-between border border-gray-700 hover:border-[#3e3ff5] hover:bg-gray-100 bg-gray-200">
                          <Link href="/" className="flex items-center">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="font  p-2">Volver al inicio</span>
                          </Link>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Ventas</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {/* 3 */}

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className={`hover:!text-[#3e3ff5] ${
                          pathname === "/dashboard/envios"
                            ? "border border-[#3e3ff5] !text-[#3e3ff5] "
                            : ""
                        }`}
                      >
                        <Link href="/dashboard/envios" onClick={handleNavClick}>
                          <LocalShipping className="h-4 w-4" />
                          <span>Envíos</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* 4s */}
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className={`hover:!text-[#3e3ff5] ${
                          pathname === "/dashboard/ventas"
                            ? "border border-[#3e3ff5] !text-[#3e3ff5] "
                            : ""
                        }`}
                      >
                        <Link href="/dashboard/ventas" onClick={handleNavClick}>
                          <LocalShipping className="h-4 w-4" />
                          <span>Ventas</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              {/* Inventario Section */}
              <SidebarGroup>
                <SidebarGroupLabel>Inventario</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {/* Collapsible Inventory Edit Section */}
                    <Collapsible
                      open={activeMenu === "inventory"}
                      onOpenChange={(open) => {
                        if (open) {
                          setActiveMenu("inventory");
                          setActiveItem(null); // Limpiamos el item seleccionado al abrir
                        } else {
                          setActiveMenu(null);
                          setActiveItem(null); // Limpiamos al cerrar
                        }
                      }}
                      className="w-full"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className={`cursor-pointer ${
                              activeMenu === "inventory"
                                ? "!text-[#3e3ff5] border border-[#3e3ff5]"
                                : "hover:!text-[#3e3ff5]"
                            }`}
                          >
                            <Package className="h-4 w-4" />
                            <span>Editar</span>
                            {activeMenu === "inventory" ? (
                              <ChevronUp className="ml-auto h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-auto h-4 w-4" />
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                      </SidebarMenuItem>
                      <CollapsibleContent>
                        <div className="pl-4 pt-1 my-2">
                          {inventoryItems.map((item) => (
                            <SidebarMenuItem key={item.path}>
                              <SidebarMenuButton asChild size="sm">
                                <Link
                                  href={item.path}
                                  onClick={() => {
                                    setActiveItem(item.path);
                                    handleNavClick(); // Cierra el drawer móvil
                                  }}
                                  className={`hover:!text-[#3e3ff5] ${
                                    activeItem === item.path
                                      ? "border border-[#3e3ff5] !text-[#3e3ff5]"
                                      : ""
                                  }`}
                                >
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
                      open={activeMenu === "stock"}
                      onOpenChange={(open) => {
                        if (open) {
                          setActiveMenu("stock");
                          setActiveItemStock(null); // Limpiamos el item seleccionado al abrir
                        } else {
                          setActiveMenu(null);
                          setActiveItemStock(null); // Limpiamos al cerrar
                        }
                      }}
                      className="w-full"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className={`cursor-pointer ${
                              activeMenu === "stock"
                                ? "!text-[#3e3ff5] border border-[#3e3ff5]"
                                : "hover:!text-[#3e3ff5]"
                            }`}
                          >
                            <PlusCircle className="h-4 w-4" />
                            <span>Añadir Stock</span>
                            {activeMenu === "stock" ? (
                              <ChevronUp className="ml-auto h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-auto h-4 w-4" />
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                      </SidebarMenuItem>
                      <CollapsibleContent>
                        <div className="pl-4 pt-1 my-2">
                          {inventoryItems.map((item) => (
                            <SidebarMenuItem key={item.path}>
                              <SidebarMenuButton asChild size="sm">
                                <Link
                                  href={`/dashboard/agregarstock${item.path.replace(
                                    "/dashboard/editar",
                                    ""
                                  )}`}
                                  onClick={() => {
                                    setActiveItemStock(item.path);
                                    handleNavClick(); // Cierra el drawer móvil
                                  }}
                                  className={`hover:!text-[#3e3ff5] ${
                                    activeItemStock === item.path
                                      ? "border border-[#3e3ff5] !text-[#3e3ff5]"
                                      : ""
                                  }`}
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
          </div>

          {/* Main Content */}
          <main className="w-full">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
