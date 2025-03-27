import { memo } from "react";
import { useAppSelector } from "@/app/store/store";

import { Animal } from "@/features/clicker/animal";
import { NavBar } from "@/features/clicker/navbar";
import { InfinityMiglioramenti } from "@/features/clicker/infinity-miglioramenti";
import { userInfoIsLoaded } from "@/entities/user/model/userSlice";
import styles from "./HomePage.module.scss";

export const HomePage = memo(() => {
  const dataIsLoaded = useAppSelector(userInfoIsLoaded);
  if (!dataIsLoaded)
    return <h2 className={styles.home__loading}>Загрузка...</h2>;
  return (
    <section className={styles.home}>
      <Animal />
      <NavBar />
      <InfinityMiglioramenti />
    </section>
  );
});
