"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./categorias.module.css";
import img_iphone from "../../../assets/imagenes/inicio/ipne.jpg";
import img_airpod from "../../../assets/imagenes/inicio/airpods_blanco.jpg";
import img_androidd from "../../../assets/imagenes/inicio/andri.jpg";
import img_ipad from "../../../assets/imagenes/inicio/ip.jpg";
import Link from "next/link";
const Categorias = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Cambié esto a `false` para que las animaciones se repitan si se sale de la vista
    threshold: 0.2, // Especifica que se active cuando el 20% del componente esté en la vista
  });

  return (
    <div className={styles.padre}>
      <div className={styles.padre_categorias}>
        <motion.div
          ref={ref}
          className={styles.caja}
          initial={{ opacity: 0, y: 400 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.0, ease: "easeOut", delay: 0.3 }}
        >
          <section className={styles.page}>
            {/* Animación de cada artículo con retraso */}
            <motion.article
              className={styles.contenedor_imagen}
              initial={{ opacity: 0, x: -100 }} // Comienza a la izquierda
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.0, // Retraso para el primer artículo
              }}
            >
              <Link href="/productos/iphone">
                <div className={styles.cnt_img}>
                  <Image
                    src={img_iphone}
                    alt="iPhone"
                    className={`${styles.imagen_iphone} ${styles.imagen_general}`}
                    quality={100}
                  />
                </div>
              </Link>
              <div className={styles.title_cnt}>
                <h2 className={styles.title_card}>iPhones</h2>
                <p className={styles.subtitle_card}>Nuevos y usados</p>
              </div>
            </motion.article>

            <motion.article
              className={styles.contenedor_imagen}
              initial={{ opacity: 0, x: -100 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3, // Retraso para el segundo artículo
              }}
            >
              <Link href={"/productos/andorid"}>
                <div>
                  <Image
                    src={img_androidd}
                    alt="Android"
                    className={`${styles.imagen_android} ${styles.imagen_general}`}
                    quality={100}
                  />
                </div>
              </Link>
              <div className={styles.title_cnt}>
                <h2 className={styles.title_card}>Android</h2>
                <p className={styles.subtitle_card}>
                  Modelos nuevos y de segunda mano.
                </p>
              </div>
            </motion.article>

            <motion.article
              className={styles.contenedor_imagen}
              initial={{ opacity: 0, x: -100 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.6, // Retraso para el último artículo
              }}
            >
              <Link href="/productos/ipad">
                <div>
                  <Image
                    src={img_ipad}
                    alt="ipad"
                    className={`${styles.imagen_mac} ${styles.imagen_general}`}
                    quality={100}
                  />
                </div>
              </Link>
              <div className={styles.title_cnt}>
                <h2 className={styles.title_card}>iPads</h2>
                <p className={styles.subtitle_card}>iPads nuevas y usadas</p>
              </div>
            </motion.article>
            <motion.article
              className={styles.contenedor_imagen}
              initial={{ opacity: 0, x: -100 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.6, // Retraso para el último artículo
              }}
            >
              <Link href="/productos/accesorios">
                <div>
                  <Image
                    src={img_airpod}
                    alt="AirPods y Accesorios"
                    className={`${styles.imagen_airpod} ${styles.imagen_general}`}
                    quality={100}
                  />
                </div>
              </Link>
              <div className={styles.title_cnt}>
                <h2 className={styles.title_card}>AirPods y Accesorios</h2>
                <p className={styles.subtitle_card}>
                  AirPods, cargadores y fuentes
                </p>
              </div>
            </motion.article>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Categorias;
