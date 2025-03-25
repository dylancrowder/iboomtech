"use client";
import Carousel from "@/secciones/inicio/carousel/Carousel";
import Categorias from "@/secciones/inicio/categorias/Categorias";
import SobreNosotros from "@/secciones/inicio/sobrenosotros/SobreNosotros";

export default function Navbar() {
  return (
    <>
      <div className="">
        <Categorias />
        <Carousel/>
        <SobreNosotros/>
      </div>
    </>
  );
}
