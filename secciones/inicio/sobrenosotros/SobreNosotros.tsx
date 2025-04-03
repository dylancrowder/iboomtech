"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./sobre_nosotros.module.css";
import { StaticImageData } from "next/image";
// Iconos
import icon_nuevo_color from "../../../assets/imagenes/sobrenosotros/nuevo-producto-azul.png";
import icon_color_change from "../../../assets/imagenes/sobrenosotros/azul-change.png";
import icon_color_envios from "../../../assets/imagenes/sobrenosotros/envio-azul.png";
import icon_local_color from "../../../assets/imagenes/sobrenosotros/tienda-azul.png";

import chevronDown from "../../../assets/imagenes/sobrenosotros/abajo-chevron.png";
import chevronUp from "../../../assets/imagenes/sobrenosotros/hasta-chevron.png";
interface CardProps {
  icon: StaticImageData;
  title: string;
  description: string;
}
const Card: React.FC<CardProps> = ({ icon, title, description }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Solo animar una vez
    threshold: 1, // Se activa cuando el 20% del componente está visible
  });
  const [abrir, setAbrir] = useState(false);
  function handleAbrir() {
    setAbrir((prev) => !prev);
  }

  return (
    <div className={styles.padre_carta}>
      <motion.div
        ref={ref}
        className={styles.card_container}
        initial={{ opacity: 0, y: 160 }} // Comienza 50px abajo y con opacidad 0
        animate={
          inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 } // Solo anima si está en vista
        }
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className={styles.container_info}>
          <div className={styles.img_text_cont}>
            <div className={styles.c}>
              <div className={styles.ll}>
                <Image src={icon} alt={title} className={styles.icon_img} />
              </div>
              <h2 className={styles.subtitle_about}>{title}</h2>
            </div>
            <button className={styles.btn_mas} onClick={handleAbrir}>
              <Image
                src={abrir ? chevronUp : chevronDown}
                alt={abrir ? "Cerrar" : "Abrir"}
                className={styles.chevron_icon}
              />
            </button>
          </div>
          <div className={styles.motion_ctn}>
            <motion.div
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={
                abrir
                  ? { opacity: 1, maxHeight: 300 }
                  : { opacity: 0, maxHeight: 0 }
              }
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={abrir ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className={styles.desc}
              >
                {description}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SobreNosotros = () => {
  const cardsData = [
    {
      icon: icon_nuevo_color,
      title: "Productos Nuevos",
      description:
        "Intercambiamos tu iPhone por uno nuevo o reacondicionado, con garantía incluida.",
    },
    {
      icon: icon_color_change,
      title: "Cambiamos tu dispositivo",
      description:
        "Intercambiamos tu iPhone por uno nuevo o reacondicionado, con garantía incluida.",
    },
  ];

  const cardData2 = [
    {
      icon: icon_color_envios,
      title: "Envíos",
      description:
        "Realizamos envíos a todo el país con garantía y seguimiento.",
    },
    {
      icon: icon_local_color,
      title: "Local Físico",
      description:
        "Visítanos en nuestro local para ver y probar nuestros productos.",
    },
  ];

  return (
    <section className={styles.about}>
      <div className={styles.gen}>
        <div className={styles.cnt_title}>
          <p className={styles.aboutText}>
            En <strong>iBoomTech</strong>, nos especializamos en ofrecer
            productos tecnológicos,
            <br /> tanto nuevos como de segunda mano, con garantía y a precios
            competitivos.
          </p>
        </div>
        <div className={styles.flex}>
          <div className={styles.grid_container}>
            <div className={styles.margin_top}>
              {cardsData.map((card, index) => (
                <Card key={index} {...card} />
              ))}
            </div>
            <div>
              {cardData2.map((card, index) => (
                <Card key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreNosotros;
