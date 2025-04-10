import { User } from "lucide-react";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react"; // Asegúrate de importar useState
import useAuthStore from "@/zustand/useAuthStore";

export default function UserMenu() {
  // Este es el estado que controla la visibilidad del drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const { isAuthenticated, logout } = useAuthStore(); // Suponiendo que tienes un método 'logout' en tu store

  // Función para cerrar el drawer
  const handleLoginClick = () => {
    setIsDrawerOpen(false); // Cierra el drawer al hacer clic en "Iniciar sesión"
  };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const cerrar = async () => {
    try {
      // Aquí se hace el fetch al backend para cerrar sesión
      const response = await fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Asegúrate de enviar cookies si las hay
      });

      if (response.ok) {
        localStorage.removeItem("token");
        logout(); 

        console.log("Sesión cerrada");
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full cursor-pointer"
          onClick={() => setIsDrawerOpen(true)} // Abre el drawer al hacer clic
        >
          <User className="h-5 w-5" />
          <span className="sr-only">Menú de usuario</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isAuthenticated ? (
          <>
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/perfil">Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/pedidos">Mis pedidos</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/favoritos">Favoritos</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={cerrar}>Cerrar sesión</DropdownMenuItem>
          </>
        ) : (
          <>
            <div className="w-full flex flex-col justify-between p-1">
              <DropdownMenuItem asChild>
                <Button className="w-full" onClick={handleLoginClick}>
                  <LogIn className="mr-2 text-white" />
                  <Link href="/login">Iniciar sesión</Link>
                </Button>
              </DropdownMenuItem>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
