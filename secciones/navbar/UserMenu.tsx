"use client"

import { LogIn, LogOut, Package, User, UserCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuthStore from "@/zustand/useAuthStore"

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout } = useAuthStore()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  // Close dropdown when navigating
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false)
    }

    return () => {

    }
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (response.ok) {
        localStorage.removeItem("token")
        logout()
        setIsOpen(false)
        console.log("Sesión cerrada")
      } else {
        console.error("Error al cerrar sesión")
      }
    } catch (error) {
      console.error("Error en la solicitud:", error)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full transition-colors hover:bg-muted focus-visible:bg-muted"
          aria-label="Menú de usuario"
        >
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 p-1 animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2"
      >
        {isAuthenticated ? (
          <>
            <DropdownMenuLabel className="flex items-center gap-2 px-3 py-2">
              <UserCircle className="h-5 w-5 text-muted-foreground" />
              <span>Mi cuenta</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/perfil"
                className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <UserCircle className="h-4 w-4" />
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/envios"
                className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <Package className="h-4 w-4" />
                Envíos
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild className="p-0">
            <Link href="/login">
              <Button className="w-full justify-start gap-2 rounded-sm" variant="default">
                <LogIn className="h-4 w-4" />
                Iniciar sesión
              </Button>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
