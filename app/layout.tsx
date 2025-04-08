"use client"


import "./globals.css";
import Nav from "@/secciones/navbar/Nav";
import { Toaster } from "sonner";
import { Footer } from "@/secciones/footer/Footer";
import { useSessionCheck } from "@/hooks/Verify";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useSessionCheck();

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <header className="sticky top-0 z-50 border-b flex justify-center bg-white w-full max-w-[100vw]">
          <Nav />
          <Toaster position="top-right" offset={62} richColors />
        </header>
        {/*  <div className="w-[100%]  h-[200vh] absolute flex justify-center items-center">
          <div className="w-[90%] h-[600vh] border border-black"></div>
        </div>   */}
        {children}

        <Footer />
      </body>
    </html>
  );
}
