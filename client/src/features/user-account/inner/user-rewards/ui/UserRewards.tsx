import { useAppSelector } from "@/app/store/store";
import { UserReward } from "../user-reward";
import styles from "./UserRewards.module.scss";

export const UserRewards = () => {
  const rewardsList = useAppSelector(
    (state) => state.user.globals.achievements
  );
  console.log(rewardsList);

  return (
    <section className={styles.rewards}>
      <h3 className={styles.rewards__title}>Награды</h3>
      <ul className={styles.rewards__list}>
        {rewardsList.map((reward) => {
          return <UserReward data={reward} key={reward.name} />;
        })}
      </ul>
    </section>
  );
};
