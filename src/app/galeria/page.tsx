import React from "react";

import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function GaleriaPage() {
  const galleryItems = [
    {
      slug: "amora",
      src: "/murais/amora.webp",
      alt: "Foto do Mural representando a planta Amora pintado por Micaela Nunes",
      width: 3000,
      height: 2000,
    },
    {
      slug: "cannabis",
      src: "/murais/cannabis.webp",
      alt: "Foto do Mural representando a planta Cannabis pintado por Micaela Nunes",
      width: 3000,
      height: 2000,
    },
    {
      slug: "carqueja",
      src: "/murais/carqueja.webp",
      alt: "Foto do Mural representando a planta Carqueja pintado por Micaela Nunes",
      width: 3000,
      height: 2000,
    },
    {
      slug: "chamba",
      src: "/murais/chamba.webp",
      alt: "Foto do Mural representando a planta Chamba pintado por Micaela Nunes",
      width: 3000,
      height: 2000,
    },
    {
      slug: "mastruz",
      src: "/murais/mastruz.webp",
      alt: "Foto do Mural representando a planta Mastruz pintado por Micaela Nunes",
      width: 1200,
      height: 1600,
    },
  ];

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Galeria dos Murais</h1>
      <div className={styles.galleryGrid}>
        {galleryItems.map((item) => (
          <div className={styles.galleryWrapper} key={item.slug}>
            <Link
              className={styles.link}
              href={`/galeria/${item.slug}`}
              style={
                {
                  "--mask-url": `url("/tipografia/${item.slug}.svg")`,
                } as React.CSSProperties
              }
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className={styles.image}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.mapWrapper}>
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=1zjYC7ODKO9HBWOhyKkeDj9UP3iRW7pw&ehbc=2E312F&noprof=1"
          width="640"
          height="480"
        ></iframe>
      </div>
    </main>
  );
}
export const metadata = {
  title: "Galeria | Herbário Urbano",
  description: "Explore a galeria de plantas do Herbário Urbano.",
};
