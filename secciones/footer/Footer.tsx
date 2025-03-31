"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";
import logo from "../../assets/imagenes/logotipo/LOGO-negro-iboom.png";

export function Footer() {
  const pathname = usePathname(); // Obtener la ruta actual

  // Si la ruta comienza con "/dashboard", no se renderiza el Footer
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/checkout")
  ) {
    return null; // No renderizar el Footer
  }

  return (
    <footer className="dark:bg-gray-900 min-h-screen md:min-h-0 flex flex-col justify-end ">
      <hr className="border" />

      <div className="mx-auto w-full" style={{ width: "90%" }}>
        <div className="md:flex md:justify-between lg:py-[64px] my-[64px]">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <div className="w-70 h-auto relative">
                <Image src={logo} alt="logo" />
              </div>
            </Link>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6">
            {/* Media Section */}
            <div>
              <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white">
                Redes Sociales
              </h2>
              <div className="flex flex-row justify-start space-x-4">
                <Link
                  href="https://wa.me/yourphonenumber"
                  className="hover:underline  dark:text-gray-400 "
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-6 h-6" />
                </Link>
                <Link
                  href="https://instagram.com/yourusername"
                  className="hover:underline  dark:text-gray-400"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </Link>
              </div>
            </div>

            {/* Categories Section */}
            <div>
              <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white">
                Categorías
              </h2>
              <ul className=" dark:text-gray-400 ">
                <li className="mb-1">
                  <Link href="#" className="hover:underline">
                    iPhones
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href="#" className="hover:underline">
                    iPads
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href="#" className="hover:underline">
                    MacBooks
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href="#" className="hover:underline">
                    Android
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Accesorios
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="">
              <h2 className="mb-6 text-sm font-semibold  uppercase dark:text-white">
                Contacto
              </h2>
              <ul className=" dark:text-gray-400 ">
                <li className="mb-1">
                  <Link
                    href="mailto:contacto@comidaonline.com"
                    className="dark:text-gray-400"
                  >
                    Email: contacto@comidaonline.com
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href="tel:+1234567890" className=" dark:text-gray-400">
                    Teléfono: +123 456 7890
                  </Link>
                </li>
                <li>
                  <Link href="#" className=" dark:text-gray-400">
                    Ubicación: Calle Falsa 123, Ciudad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="border" />

        {/* Footer Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between my-[26px]">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()} iBoom™. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
