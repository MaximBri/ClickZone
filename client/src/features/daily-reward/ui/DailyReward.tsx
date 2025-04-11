import { FC } from "react";

import { dailyRewardInterface } from "@/pages/dialy-rewards/model/dailyRewardsSlice";
import { DOMAIN } from "@/shared/config/routes";
import dailyRewardPng from "./icons/dailyReward.png";
import coinSvg from "/images/resources/coin.svg";
import diamondsSvg from "/images/resources/diamond.svg";
import styles from "./DailyReward.module.scss";

export const DailyReward: FC<{ data: dailyRewardInterface }> = ({ data }) => {
  return (
    <li className={styles.reward}>
      <div className={styles["reward__image-container"]}>
        <span className={styles.reward__number}>{data.id}</span>
        <img
          className={styles.reward__image}
          src={dailyRewardPng}
          alt="daily reward"
        />
      </div>
      <div className={styles.reward__inner}>
        {data.rewards.coins && (
          <>
            {data.rewards.coins}
            <img
              className={styles.reward__coins}
              src={coinSvg}
              alt="coins"
            ></img>
          </>
        )}
        {data.rewards.diamonds && (
          <>
            {data.rewards.diamonds}
            <img
              className={styles.reward__coins}
              src={diamondsSvg}
              alt="diamonds"
            ></img>
          </>
        )}
        {data.rewards.custom && (
          <>
            {data.rewards.diamonds}
            <img
              className={styles.reward__improvements}
              src={`${DOMAIN}/images${data.rewards.custom}`}
              alt="custom"
            ></img>
          </>
        )}
      </div>
    </li>
  );
};
