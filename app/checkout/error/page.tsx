"use client";

import ErrorCompo from "@/secciones/checkout/ErrorCompon";
import { Suspense } from "react";

export default function ErrorPago() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ErrorCompo />
    </Suspense>
  );
}
