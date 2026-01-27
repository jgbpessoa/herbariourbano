import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import styles from "./page.module.css";
import BackstageGallery from "./BackstageGallery";
import { PLANTS } from "./data";

type PageProps = {
  params: { plant: string } | Promise<{ plant: string }>;
};

export default async function PlantPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.plant?.toLowerCase();
  const plant = slug ? PLANTS[slug as keyof typeof PLANTS] : undefined;

  if (!plant) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.srOnly}>{plant.title}</h1>
      <Image
        src={`/tipografia/${slug}.svg`}
        alt={plant.title}
        width={330}
        height={62}
        className={styles.titleSvg}
        priority
      />
      <figure className={styles.figure}>
        <div className={styles.imageWrapper}>
          <Image
            src={plant.image}
            alt={plant.alt}
            fill
            className={styles.image}
          />
        </div>
        <figcaption className={styles.caption}>{plant.caption}</figcaption>
      </figure>
      <div className={styles.audioWrapper}>
        <p>Áudio descrição</p>
        <audio controls>
          <source src={`/audios/${slug}.mp3`} type="audio/mpeg" />
          Seu navegador não suporta o elemento de áudio.
        </audio>
      </div>
      <BackstageGallery slug={slug ?? ""} />
      <div className={styles.textWrapper}>
        <div className={styles.infoCard}>
          {plant.info.map((item) => (
            <p key={item.label}>
              <span className={styles.infoLabel}>{item.label}</span>
              {item.text}
            </p>
          ))}
        </div>
        <div className={styles.mapWrapper}>
          <iframe
            title={plant.map.title}
            src={plant.map.src}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.map}
          />
        </div>
        <div className={styles.sections}>
          {plant.sections.map((section) => (
            <section className={styles.section} key={section.title}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              {section.body ? (
                <p className={styles.sectionBody}>{section.body}</p>
              ) : null}
              {"list" in section && Array.isArray(section.list) ? (
                <ul className={styles.list}>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Galeria | Herbário Urbano",
  description: "Explore a galeria de plantas do Herbário Urbano.",
};

export function generateStaticParams() {
  return Object.keys(PLANTS).map((plant) => ({ plant }));
}
