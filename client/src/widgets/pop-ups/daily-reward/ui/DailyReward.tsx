import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { memo, useEffect, useState } from "react";

import { setDailyReward } from "../../model/popUpsSlice";
import { getCurrentRewardThunk } from "@/entities/user/daily-rewards/thunks/getCurrentReward.thunk";
import coinSvg from "/images/resources/coin.svg";
import diamondsSvg from "/images/resources/diamond.svg";
import styles from "./DailyReward.module.scss";

export const DailyReward = memo(() => {
  const dispatch = useAppDispatch();
  const [open, setIsOpen] = useState<boolean>(false);
  const currentRewardsData = useAppSelector((state) => state.dialyRewards);
  if (currentRewardsData.currentDay === null) {
    console.log(1);
    return null;
  }
  const currentDayReward =
    currentRewardsData.data[currentRewardsData.currentDay - 1];

  useEffect(() => {
    setIsOpen(true);
  }, []);

  if (!currentDayReward || !currentRewardsData.canGetReward) {
    console.log(currentDayReward, currentRewardsData.canGetReward);
    return null;
  }

  const currentReward = currentDayReward.rewards;
  const closeWindow = () => {
    setIsOpen(false);
    setTimeout(() => {
      dispatch(setDailyReward(false));
      dispatch(getCurrentRewardThunk());
    }, 250);
  };

  return (
    <>
      <div
        onClick={closeWindow}
        className={`${styles.reward__background} ${
          !open ? styles["reward--hidden"] : ""
        }`}
      ></div>
      <section
        className={`${styles.reward} ${!open ? styles["reward--hidden"] : ""}`}
      >
        <h2 className={styles.reward__title}>Ваша ежедневная награда:</h2>
        <div className={styles.reward__reward}>
          {currentReward.coins && (
            <>
              {currentReward.coins}
              <img
                className={styles.reward__coin}
                src={coinSvg}
                alt="coin"
              ></img>
            </>
          )}
          {currentReward.diamonds && (
            <>
              {currentReward.diamonds}
              <img
                className={styles.reward__coin}
                src={diamondsSvg}
                alt="coin"
              ></img>
            </>
          )}
        </div>
        <button onClick={closeWindow} className={styles.reward__button}>
          Забрать!
        </button>
      </section>
    </>
  );
});
