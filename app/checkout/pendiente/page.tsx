"use client";

import Link from "next/link";

export default function Pendiente() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-yellow-500">Pago pendiente ⏳</h1>
      <p>Tu pago está en proceso. Te notificaremos cuando se complete.</p>
      <Link href="/" className="mt-4 text-blue-500">
        Volver a la tienda
      </Link>
    </div>
  );
}
