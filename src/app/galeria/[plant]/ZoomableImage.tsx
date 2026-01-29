"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import styles from "./page.module.css";

type ZoomableImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  imageClassName?: string;
};

export default function ZoomableImage({
  src,
  alt,
  sizes,
  priority,
  imageClassName,
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const openZoom = () => setIsOpen(true);
  const closeZoom = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div className={styles.zoomWrapper}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={imageClassName}
        />
        <button
          type="button"
          className={`${styles.backstageButton} ${styles.zoomButton}`}
          onClick={openZoom}
          aria-label="Ampliar imagem"
        >
          🔍
        </button>
      </div>

      {isOpen ? (
        <div
          className={styles.zoomOverlay}
          role="dialog"
          aria-modal="true"
          onClick={closeZoom}
        >
          <button
            ref={closeRef}
            type="button"
            className={`${styles.closeButton} ${styles.zoomClose}`}
            onClick={closeZoom}
            aria-label="Fechar imagem ampliada"
          >
            x
          </button>
          <div
            className={styles.zoomImageFrame}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              priority={priority}
              className={styles.zoomImage}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
