import { memo } from "react";

import { Animal } from "@/features/clicker/animal";
import { NavBar } from "@/features/clicker/navbar";
import { InfinityMiglioramenti } from "@/features/clicker/infinity-miglioramenti";
import styles from "./HomePage.module.scss";

export const HomePage = memo(() => {
  return (
    <section className={styles.home}>
      <Animal />
      <NavBar />
      <InfinityMiglioramenti />
    </section>
  );
});
