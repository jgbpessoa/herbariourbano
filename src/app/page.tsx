import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={`${styles.main} ${styles.mainContainer}`}>
      <h1>Herbário Urbano</h1>
      <section className={styles.hero}>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={"/titulo.avif"}
            alt="Herbário Urbano"
            fill
          />
        </div>
        <a
          className={styles.link}
          href="/ebook-do-herbario-urbano.pdf"
          target="_blank"
          rel="noopener"
        >
          Acessar o E-book
        </a>
        <Link className={styles.link} href="/galeria">
          Galeria dos Murais
        </Link>
      </section>
    </main>
  );
}
