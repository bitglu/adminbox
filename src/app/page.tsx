"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="https://softr-prod.imgix.net/applications/60a6cb1b-5e47-49b2-b863-29c3c33a47d8/assets/bb558c09-daac-48ab-891b-c8732b974c56.png"
          alt="Bitglu"
          width={400}
          height={400}
          priority
        />
        <div className={styles.thirteen}>7</div>
      </div>

      <div className={styles.grid}>
        <a href="/dashboard" className={styles.card} rel="noopener noreferrer">
          <h2 className={inter.className}>
            Go to dashboard <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Go to AdminBox dashboard</p>
        </a>
      </div>
    </main>
  );
}
