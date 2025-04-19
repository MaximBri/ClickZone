import { useAppSelector } from "@/app/store/store";

import { DailyReward } from "@/features/daily-reward";
import { getDailyRewards } from "@/entities/user/daily-rewards/model/dailyRewardsSlice";
import { getIsAuthorized } from "@/entities/user/model/selectors";
import styles from "./DailyRewardsPage.module.scss";

export const DailyRewardsPage = () => {
  const dailyRewards = useAppSelector(getDailyRewards);
  const isAuth = useAppSelector(getIsAuthorized);
  const currentDay = useAppSelector((state) => state.dialyRewards.currentDay);
  const now = useAppSelector((state) => state.dialyRewards.hoursToNextReward);
  
  if (!dailyRewards.length || isAuth === false || currentDay === null)
    return <h2 className={styles.rewards__loading}>Загрузка...</h2>;

  return (
    <section className={styles.rewards}>
      <h2 className={styles.rewards__title}>Ежедневные награды</h2>
      <h3 className={styles.rewards__subtitle}>
        До вашей следующей награды осталось часов: <strong>{now}</strong>
      </h3>
      <ul className={styles.rewards__list}>
        {dailyRewards.map((item) => {
          return (
            <DailyReward data={item} key={item.id} currentDay={currentDay} />
          );
        })}
      </ul>
    </section>
  );
};
