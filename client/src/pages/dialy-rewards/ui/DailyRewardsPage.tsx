import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { useEffect } from "react";

import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { DailyReward } from "@/features/daily-reward";
import { getDailyRewards, setDailyRewards } from "../model/dailyRewardsSlice";
import styles from "./DailyRewardsPage.module.scss";

export const DailyRewardsPage = () => {
  const dispatch = useAppDispatch();
  const dailyRewards = useAppSelector(getDailyRewards);

  const getDailyRewardsData = async () => {
    try {
      const response = await api.get(apiRoutes.getDailyRewards);
      dispatch(setDailyRewards(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!dailyRewards.length) {
      getDailyRewardsData();
    }
  }, [dailyRewards]);

  if (!dailyRewards.length) return null;

  const now = new Date().getHours();
  return (
    <section className={styles.rewards}>
      <h2 className={styles.rewards__title}>Ежедневные награды</h2>
      <h3 className={styles.rewards__subtitle}>
        До вашей следующей награды осталось: <strong>{now} часов</strong>
      </h3>
      <ul className={styles.rewards__list}>
        {dailyRewards.map((item) => {
          return <DailyReward data={item} key={item.id} />;
        })}
      </ul>
    </section>
  );
};
