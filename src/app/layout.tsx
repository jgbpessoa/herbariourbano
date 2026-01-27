import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import styles from "./page.module.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Herbário Urbano",
  description: "Site destinado ao projeto Herbário Urbano",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${styles.main}`}
      >
        {children}
        <Analytics />
        <footer className={styles.footer}>
          <div className={styles.logoWrapper}>
            <Image src={"/logo.avif"} alt="Patrocinadores" fill />
          </div>
        </footer>
      </body>
    </html>
  );
}
