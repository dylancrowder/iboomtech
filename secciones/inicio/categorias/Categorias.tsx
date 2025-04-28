"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Imágenes
import img_iphone from "../../../assets/imagenes/inicio/ipne.jpg";
import img_airpod from "../../../assets/imagenes/inicio/airpods_blanco.jpg";
import img_androidd from "../../../assets/imagenes/inicio/andri.jpg";
import img_ipad from "../../../assets/imagenes/inicio/ip.jpg";

const categorias = [
  {
    img: img_iphone,
    title: "iPhones",
    subtitle: "Nuevos y usados",
    link: "/productos/iphone",
    delay: 0.0,
  },
  {
    img: img_androidd,
    title: "Android",
    subtitle: "Modelos nuevos y de segunda mano.",
    link: "/productos/andorid",
    delay: 0.2,
  },
  {
    img: img_ipad,
    title: "iPads",
    subtitle: "iPads nuevas y usadas",
    link: "/productos/ipad",
    delay: 0.4,
  },
  {
    img: img_airpod,
    title: "AirPods y Accesorios",
    subtitle: "AirPods, cargadores y fuentes",
    link: "/productos/accesorios",
    delay: 0.6,
  },
];

const Categorias = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-12 ">
      <div className=" mx-auto w-[90%]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {categorias.map((categoria, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: categoria.delay,
              }}
            >
              <Link href={categoria.link}>
                <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer  h-[500px]">
                  <CardHeader className="flex flex-col items-center space-y-4">
                    <div className="overflow-hidden rounded-md">
                      <Image
                        src={categoria.img}
                        alt={categoria.title}
                        className="object-cover w-full h-90"
                        quality={100}
                      />
                    </div>
                    <CardTitle className="text-center text-lg">
                      {categoria.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-sm text-muted-foreground">
                      {categoria.subtitle}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categorias;
