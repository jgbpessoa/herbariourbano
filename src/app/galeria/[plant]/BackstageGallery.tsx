"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";
import ZoomableImage from "./ZoomableImage";

const BACKSTAGE_BY_SLUG = {
  amora: [
    { src: "/bastidores/amora/1.webp", caption: "Foto: Juliana Amara" },
    { src: "/bastidores/amora/2.webp", caption: "Foto: Juliana Amara" },
    { src: "/bastidores/amora/3.webp", caption: "Foto: Juliana Amara" },
    { src: "/bastidores/amora/4.webp", caption: "Foto: Juliana Amara" },
    { src: "/bastidores/amora/5.webp", caption: "Foto: Juliana Amara" },
    { src: "/bastidores/amora/6.webp", caption: "Foto: Juliana Amara" },
    { src: "/bastidores/amora/7.webp", caption: "Foto: Juliana Amara" },
    { src: "/bastidores/amora/8.webp", caption: "Foto: Juliana Amara" },
    { src: "/bastidores/amora/9.webp", caption: "Foto: Juliana Amara" },
  ],
  cannabis: [
    { src: "/bastidores/cannabis/1.webp", caption: "Foto: Juliana Amara" },
    { src: "/bastidores/cannabis/2.webp", caption: "Foto: Juliana Amara" },
    { src: "/bastidores/cannabis/3.webp", caption: "Foto: Raphael Vieitez" },
    { src: "/bastidores/cannabis/4.webp", caption: "Foto: Raphael Vieitez" },
  ],
  carqueja: [
    { src: "/bastidores/carqueja/1.webp", caption: "Foto: Raphael Vieitez" },
    { src: "/bastidores/carqueja/2.webp", caption: "Foto: Raphael Vieitez" },
    { src: "/bastidores/carqueja/3.webp", caption: "Foto: Bashir Ali" },
    { src: "/bastidores/carqueja/4.webp", caption: "Foto: Bashir Ali" },
  ],
  chamba: [
    { src: "/bastidores/chamba/1.webp", caption: "Foto: Juliana Amara" },
    { src: "/bastidores/chamba/2.webp", caption: "Foto: Juliana Amara" },
    { src: "/bastidores/chamba/3.webp", caption: "Foto: Juliana Amara" },
    { src: "/bastidores/chamba/4.webp", caption: "Foto: Juliana Amara" },
  ],
  mastruz: [
    { src: "/bastidores/mastruz/1.webp", caption: "Foto: Raphael Vieitez" },
    { src: "/bastidores/mastruz/2.webp", caption: "Foto: Raphael Vieitez" },
    { src: "/bastidores/mastruz/3.webp", caption: "Foto: Raphael Vieitez" },
    { src: "/bastidores/mastruz/4.webp", caption: "Foto: Raphael Vieitez" },
  ],
} as const;

type BackstageGalleryProps = {
  slug: string;
};

export default function BackstageGallery({ slug }: BackstageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const galleryImages = useMemo(() => {
    const label = slug ? `${slug[0].toUpperCase()}${slug.slice(1)}` : "planta";
    const images =
      BACKSTAGE_BY_SLUG[slug as keyof typeof BACKSTAGE_BY_SLUG] ?? [];

    return images.map((image, imageIndex) => ({
      ...image,
      alt: `Bastidores do mural ${label}, foto ${imageIndex + 1}`,
    }));
  }, [slug]);

  const showNext = useCallback(() => {
    setIndex((current) => (current + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const showPrev = useCallback(() => {
    setIndex(
      (current) => (current - 1 + galleryImages.length) % galleryImages.length,
    );
  }, [galleryImages.length]);

  const openGallery = useCallback(() => {
    setIndex(0);
    setIsOpen(true);
  }, []);

  const closeGallery = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeGallery();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeGallery, isOpen, showNext, showPrev]);

  useEffect(() => {
    if (index >= galleryImages.length) {
      setIndex(0);
    }
  }, [galleryImages.length, index]);

  if (galleryImages.length === 0) {
    return null;
  }

  const currentImage = galleryImages[index];

  return (
    <div className={styles.galleryBlock}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.backstageButton}
        onClick={openGallery}
      >
        Galeria dos Bastidores
      </button>

      {isOpen ? (
        <div className={styles.galleryOverlay} role="dialog" aria-modal="true">
          <div className={styles.galleryDialog}>
            <div className={styles.galleryHeader}>
              <p className={styles.galleryTitle}>Galeria dos Bastidores</p>
              <button
                ref={closeRef}
                type="button"
                className={styles.closeButton}
                onClick={closeGallery}
                aria-label="Fechar galeria"
              >
                x
              </button>
            </div>
            <div className={styles.galleryImageFrame}>
              <ZoomableImage
                src={currentImage.src}
                alt={currentImage.alt}
                sizes="(max-width: 768px) 92vw, 860px"
                imageClassName={styles.galleryImage}
                priority
              />
              <button
                type="button"
                className={`${styles.navButton} ${styles.navButtonLeft}`}
                onClick={showPrev}
                aria-label="Foto anterior"
              >
                ‹
              </button>
              <button
                type="button"
                className={`${styles.navButton} ${styles.navButtonRight}`}
                onClick={showNext}
                aria-label="Proxima foto"
              >
                ›
              </button>
            </div>
            <p className={styles.galleryCaption}>{currentImage.caption}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
