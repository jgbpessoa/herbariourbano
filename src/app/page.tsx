import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
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
        <a className={styles.link} href="#" target="_blank">
          Acessar o E-book
        </a>
      </section>
      <footer className={styles.footer}>
        <div className={styles.logoWrapper}>
          <Image src={"/logo.avif"} alt="Patrocinadores" fill />
        </div>
      </footer>
    </main>
  );
}
