import { FC } from "react";

import { achievementInterface } from "@/shared/types";
import styles from "./UserReward.module.scss";
import { DOMAIN } from "@/shared/config/routes";

export const UserReward: FC<{ data: achievementInterface }> = ({ data }) => {
  return (
    <li className={styles.reward}>
      <img className={`${styles.reward__image} ${data.has_achievement ?'' : styles['reward__image--grey']}`} src={`${DOMAIN}/images/rewards/${data.imagePath}`} alt="reward" />
      <h4 className={styles.reward__title}>{data.name}</h4>
    </li>
  );
};
