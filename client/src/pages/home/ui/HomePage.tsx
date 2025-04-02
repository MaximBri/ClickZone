import { memo } from "react";
import { useAppSelector } from "@/app/store/store";

import { Animal } from "@/features/clicker/animal";
import { ClickerNavBar } from "@/features/clicker/navbar";
import { InfinityMiglioramenti } from "@/features/clicker/infinity-miglioramenti";
import { userInfoIsLoaded } from "@/entities/user/model/selectors";
import { ProgressInfo } from "@/features/clicker/progress-info";
import styles from "./HomePage.module.scss";

export const HomePage = memo(() => {
  const clickerData = useAppSelector(userInfoIsLoaded);
  if (clickerData === null)
    return <h2 className={styles.home__loading}>Загрузка...</h2>;
  return (
    <section className={styles.home}>
      <ProgressInfo />
      <Animal />
      <ClickerNavBar />
      <InfinityMiglioramenti />
    </section>
  );
});
