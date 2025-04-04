"use client";

import Link from "next/link";

import React from "react";

const ErrorCompo = () => {



  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-red-600">Pago fallido ❌</h1>
      <p>Hubo un problema al procesar tu pago. Intenta de nuevo.</p>
      <Link href="/" className="mt-4 text-blue-500">Volver a la tienda</Link>
    </div>
  );
};

export default ErrorCompo;
