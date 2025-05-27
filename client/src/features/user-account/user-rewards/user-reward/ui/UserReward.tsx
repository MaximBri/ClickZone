import { FC } from "react";

import { achievementInterface } from "@/shared/types";
import styles from "./UserReward.module.scss";
import { DOMAIN } from "@/shared/config/routes";

/**
 * Функция отвечает за отображение одной награды, данные о которой получает в параметре.
 * @param {achievementInterface} { data } - данные о награде: название, описание, получена или нет.
 */
export const UserReward: FC<{ data: achievementInterface }> = ({ data }) => {
  return (
    <li className={styles.reward}>
      <img
        className={`${styles.reward__image} ${
          data.has_achievement ? "" : styles["reward__image--grey"]
        }`}
        src={`${DOMAIN}/images/rewards/${data.imagePath}`}
        alt="reward"
      />
      <h4 className={styles.reward__title}>{data.name}</h4>
    </li>
  );
};
