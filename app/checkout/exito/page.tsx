"use client";

import { Suspense } from "react";
import ExitoCompo from "../../../secciones/checkout/ExitoCompon";

export default function ExitoPage() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ExitoCompo />
    </Suspense>
  );
}
