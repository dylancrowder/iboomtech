// components/UserMenu.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";

export default function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <User className="h-5 w-5" />
          <span className="sr-only">Cuenta de usuario</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/login">Iniciar sesión</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/registro">Registrarse</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log("Cerrar sesión")}>
          <Button variant="destructive">Cerrar sesión</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
