"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card,  CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import img_iphone from "../../../assets/imagenes/carrousel/iphone-blanca-r.png";
import img_android from "../../../assets/imagenes/carrousel/android-blanca-r.png";

const products = [
  { id: 1, name: "iPhone 13", price: "$799", image: img_android },
  { id: 2, name: "iPhone 14 Pro", price: "$999", image: img_iphone },
  { id: 3, name: "Samsung S23", price: "$899", image: img_iphone },
  { id: 4, name: "MacBook Air M2", price: "$1,199", image: img_iphone },
  { id: 5, name: "iPad Pro", price: "$1,099", image: img_iphone },
  { id: 6, name: "Apple Watch", price: "$399", image: img_iphone },
  { id: 7, name: "AirPods Pro", price: "$249", image: img_iphone },
];

export default function Carousel() {
  return (
    <section className="py-16 bg-gray-100  ">
      <div className=" mx-auto px-6 w-[90%] ">
        {/* TÍTULO */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800">
            Productos Destacados
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Descubre nuestras mejores ofertas
          </p>
        </div>

        {/* Carrusel */}
        <div className="relative w-full ">
          {/* Botón Izquierdo */}
          <button className="prevButton absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition">
            <ChevronLeft size={24} />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            slidesPerGroup={1}
            navigation={{
              nextEl: ".nextButton",
              prevEl: ".prevButton",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            className="w-full"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Card className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden lg:h-[490px]  flex flex-col">
                  <div className="relative w-full h-[500px] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-100"
                      quality={100}
                    />
                  </div>
                  <CardHeader className="flex-1 flex flex-row justify-between items-center  p-6 ">
                    <CardTitle className="text-xl">{product.name}</CardTitle>

                    <p className=" text-muted-foreground">{product.price}</p>
                  </CardHeader>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botón Derecho */}
          <button className="nextButton absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
