"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./categorias.module.css";
import img_iphone from "../../../assets/imagenes/inicio/iphone-blanca.jpg";
import img_android from "../../../assets/imagenes/inicio/android-blanca.jpg";
import img_airpod from "../../../assets/imagenes/inicio/airpods_blanco.jpg";
import img_mac from "../../../assets/imagenes/inicio/mcoro.jpg";

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
              <div className={styles.cnt_img}>
                <Image
                  src={img_iphone}
                  alt="iPhone"
                  className={`${styles.imagen_iphone} ${styles.imagen_general}`}
                  quality={100}
                />
              </div>
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
              <div>
                <Image
                  src={img_android}
                  alt="Android"
                  className={`${styles.imagen_android} ${styles.imagen_general}`}
                  quality={100}
                />{" "}
              </div>
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
              <div>
                <Image
                  src={img_mac}
                  alt="macbook"
                  className={`${styles.imagen_airpod} ${styles.imagen_general}`}
                  quality={100}
                />
              </div>
              <div className={styles.title_cnt}>
                <h2 className={styles.title_card}>MacBooks</h2>
                <p className={styles.subtitle_card}>
                  MackbooKs nuevas y usadas
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
              <div>
                <Image
                  src={img_airpod}
                  alt="AirPods y Accesorios"
                  className={`${styles.imagen_airpod} ${styles.imagen_general}`}
                  quality={100}
                />
              </div>

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
