import { DailyReward } from "@/features/daily-reward";
import { dailyRewardsList } from "../model/dailyRewardsList";
import styles from "./DailyRewardsPage.module.scss";

export const DailyRewardsPage = () => {
  const now = new Date().getHours();
  return (
    <section className={styles.rewards}>
      <h2 className={styles.rewards__title}>Ежедневные награды</h2>
      <h3 className={styles.rewards__subtitle}>
        До вашей следующей награды осталось: <strong>{now} часов</strong>
      </h3>
      <ul className={styles.rewards__list}>
        {dailyRewardsList.map((item) => {
          return <DailyReward data={item} key={item.id} />;
        })}
      </ul>
    </section>
  );
};
