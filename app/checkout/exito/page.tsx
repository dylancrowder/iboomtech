"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Exito() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-green-600">¡Pago exitoso! 🎉</h1>
      <p>Tu pago ha sido procesado correctamente.</p>
      <p>ID de pago: {paymentId}</p>
      <p>Estado: {status}</p>
      <Link href="/" className="mt-4 text-blue-500">
        Volver a la tienda
      </Link>
    </div>
  );
}
