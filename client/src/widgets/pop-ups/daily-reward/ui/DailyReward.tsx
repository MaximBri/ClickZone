import { store, useAppDispatch, useAppSelector } from "@/app/store/store";
import { memo, useEffect, useState } from "react";

import { setDailyReward } from "../../model/popUpsSlice";
import { getCurrentRewardThunk } from "@/entities/user/daily-rewards/thunks/getCurrentReward.thunk";
import { addOneUpgrade } from "@/entities/user/model/userSlice";
import { addContainer } from "@/pages/randomizer/model/containtersSlice";
import { DOMAIN } from "@/shared/config/routes";
import coinSvg from "/images/resources/coin.svg";
import diamondsSvg from "/images/resources/diamond.svg";
import styles from "./DailyReward.module.scss";

export const DailyReward = memo(() => {
  const dispatch = useAppDispatch();
  const [open, setIsOpen] = useState<boolean>(false);
  const currentRewardsData = useAppSelector((state) => state.dialyRewards);
  if (currentRewardsData.currentDay === null) {
    return null;
  }
  const currentDayReward =
    currentRewardsData.data[currentRewardsData.currentDay - 1];

  useEffect(() => {
    setIsOpen(true);
  }, []);

  if (!currentDayReward || !currentRewardsData.canGetReward) {
    return null;
  }

  const addContainerByReward = (id: number) => {
    const containersList = store.getState().containers.allContainers;
    const container = containersList.find((item) => item.id === id);
    if (container) {
      dispatch(addContainer(container));
    } else {
      console.error("Улучшение с id = ", id, " не было найдено");
    }
  };

  const addMiglioramentiByReward = (id: number) => {
    const miglioramentiList = store.getState().miglioramenti.data;
    const improvement = miglioramentiList.find((item) => item.id === id);
    if (improvement) {
      dispatch(addOneUpgrade(improvement));
    } else {
      console.error("Улучшение с id = ", id, " не было найдено");
    }
  };

  const currentReward = currentDayReward.rewards;
  const closeWindow = () => {
    setIsOpen(false);
    setTimeout(() => {
      dispatch(setDailyReward(false));
      dispatch(getCurrentRewardThunk());
      console.log(1, currentRewardsData.currentDay);
      if (currentRewardsData.currentDay === 5) {
        addMiglioramentiByReward(5);
      } else if (currentRewardsData.currentDay === 7) {
        addMiglioramentiByReward(6);
      } else if (currentRewardsData.currentDay === 9) {
        addMiglioramentiByReward(7);
      } else if (currentRewardsData.currentDay === 11) {
        addMiglioramentiByReward(4);
      } else if (currentRewardsData.currentDay === 10) {
        addContainerByReward(1);
      } else if (currentRewardsData.currentDay === 13) {
        addContainerByReward(2);
      }
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
          {currentReward.custom && (
            <>
              <img
                className={styles.reward__improvement}
                src={`${DOMAIN}/images${currentReward.custom}`}
                alt="improvement"
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
