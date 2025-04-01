import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { UserReward } from "../user-reward";
import infoSvg from "@/shared/icons/info.svg";
import styles from "./UserRewards.module.scss";
import { setTutorial } from "@/widgets/pop-ups/model/popUpsSlice";

export const UserRewards = () => {
  const dispatch = useAppDispatch();
  const rewardsList = useAppSelector(
    (state) => state.user.globals.achievements
  );

  return (
    <section className={styles.rewards}>
      <h3 className={styles.rewards__title}>Награды</h3>
      <button
        className={styles.rewards__info}
        onClick={() => dispatch(setTutorial({ key: "rewards", value: true }))}
      >
        <img src={infoSvg} alt="info" />
      </button>
      <ul className={styles.rewards__list}>
        {rewardsList.map((reward) => {
          return <UserReward data={reward} key={reward.name} />;
        })}
      </ul>
    </section>
  );
};
