import { memo } from "react";
import { useAppSelector } from "@/app/store/store";

import { Animal } from "@/features/clicker/animal";
import { ClickerNavBar } from "@/features/clicker/navbar";
import { InfinityMiglioramenti } from "@/features/clicker/infinity-miglioramenti";
import { userInfoIsLoaded } from "@/entities/user/model/selectors";
import styles from "./HomePage.module.scss";

export const HomePage = memo(() => {
  const dataIsLoaded = useAppSelector(userInfoIsLoaded);
  if (dataIsLoaded === null)
    return <h2 className={styles.home__loading}>Загрузка...</h2>;
  return (
    <section className={styles.home}>
      <Animal />
      <ClickerNavBar />
      <InfinityMiglioramenti />
    </section>
  );
});
