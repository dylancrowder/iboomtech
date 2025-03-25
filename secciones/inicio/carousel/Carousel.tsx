"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./carrouse.module.css";

import img_iphone from "../../../assets/imagenes/carrousel/iphone-blanca-r.png";
import img_android from "../../../assets/imagenes/carrousel/android-blanca-r.png";
import Image from "next/image";

// Datos de productos
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
    <div className={styles.centro_carrousel}>
      <div className={styles.main_carrousel}>
        <div className={styles.contenedor_carrousel}>
          {/* Botón Izquierdo */}
          <button className={`${styles.navButton} ${styles.prevButton}`}>
            <ChevronLeft size={24} />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20} // Espacio entre productos
            slidesPerView={1} // Móviles: 1 producto
            slidesPerGroup={1}
            navigation={{
              nextEl: `.${styles.nextButton}`,
              prevEl: `.${styles.prevButton}`,
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop
            breakpoints={{
              640: { slidesPerView: 2 }, // Tablets pequeñas
              768: { slidesPerView: 3 }, // Tablets grandes
              1024: { slidesPerView: 5 }, // Escritorio: 5 productos
            }}
            className={styles.swipper}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className={styles.card_c}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    className={styles.img}
                  />
                  <div className={styles.c_c}>
                    <h3 className={styles.title_card}>{product.name}</h3>
                    <p className={styles.subtitle_card}>{product.price}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botón Derecho */}
          <button className={`${styles.navButton} ${styles.nextButton}`}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
