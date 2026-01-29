"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [offsets, setOffsets] = useState({ x: 0, y: 0 });
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const naturalSizeRef = useRef({ width: 0, height: 0 });

  const openZoom = () => setIsOpen(true);
  const closeZoom = () => setIsOpen(false);

  const updateOffsets = useCallback(() => {
    const wrapper = wrapperRef.current;
    const { width, height } = naturalSizeRef.current;

    if (!wrapper || !width || !height) {
      return;
    }

    const rect = wrapper.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }

    const scale = Math.min(rect.width / width, rect.height / height);
    const displayWidth = width * scale;
    const displayHeight = height * scale;
    const offsetX = Math.max(0, (rect.width - displayWidth) / 2);
    const offsetY = Math.max(0, (rect.height - displayHeight) / 2);

    setOffsets({ x: offsetX, y: offsetY });
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) {
      return undefined;
    }

    const observer = new ResizeObserver(() => {
      updateOffsets();
    });

    observer.observe(wrapperRef.current);

    return () => {
      observer.disconnect();
    };
  }, [updateOffsets]);

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
      <div
        ref={wrapperRef}
        className={styles.zoomWrapper}
        style={
          {
            "--zoom-offset-x": `${offsets.x}px`,
            "--zoom-offset-y": `${offsets.y}px`,
          } as React.CSSProperties
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={imageClassName}
          onLoadingComplete={(image) => {
            naturalSizeRef.current = {
              width: image.naturalWidth,
              height: image.naturalHeight,
            };
            updateOffsets();
          }}
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
