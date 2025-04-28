"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { StaticImageData } from "next/image";

// Iconos
import icon_nuevo_color from "../../../assets/imagenes/sobrenosotros/nuevo-producto-azul.png";
import icon_color_change from "../../../assets/imagenes/sobrenosotros/azul-change.png";
import icon_color_envios from "../../../assets/imagenes/sobrenosotros/envio-azul.png";
import icon_local_color from "../../../assets/imagenes/sobrenosotros/tienda-azul.png";

interface CardItemProps {
  icon: StaticImageData;
  title: string;
  description: string;
}

const CardItem: React.FC<CardItemProps> = ({ icon, title, description }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-col items-center justify-center space-y-2">
          <Image src={icon} alt={title} width={60} height={60} />
          <CardTitle className="text-center text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const SobreNosotros = () => {
  const cardsData = [
    {
      icon: icon_nuevo_color,
      title: "Productos Nuevos",
      description: "Vendemos productos nuevos, sellados en caja y con garantía incluida.",
    },
    {
      icon: icon_color_change,
      title: "Cambiamos tu dispositivo",
      description: "Intercambiamos tu iPhone por uno nuevo o reacondicionado, con garantía incluida.",
    },
    {
      icon: icon_color_envios,
      title: "Envíos",
      description: "Realizamos envíos a todo el país con garantía y seguimiento.",
    },
    {
      icon: icon_local_color,
      title: "Local Físico",
      description: "Visítanos en nuestro local para ver y probar nuestros productos.",
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="text-lg md:text-xl font-semibold">
            En <strong>iBoomTech</strong> ofrecemos productos tecnológicos, nuevos y de segunda mano con garantía.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((card, index) => (
            <CardItem key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SobreNosotros;
