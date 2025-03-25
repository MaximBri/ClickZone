import { FC } from "react";
import { DOMAIN } from "@/shared/config/routes";
import { UpgradeInterface } from "@/shared/types";
import styles from "./OneTimeMiglioramenti.module.scss";

export const OneTimeMiglioramenti: FC<{
  data: UpgradeInterface;
}> = ({ data }) => {
  return (
    <li className={styles.improvement}>
      <h4 className={styles.improvement__name}>
        {data.name}
        {data.count > 1 && (
          <>
            , <strong className={styles.improvement__count}>x{data.count}</strong>
          </>
        )}
      </h4>
      <img
        className={styles.improvement__image}
        src={`${DOMAIN}/images/miglioramenti/${data.imagePath}`}
        alt="improvement"
      />
      <p className={styles.improvement__description}>{data.description}</p>
      <button className={styles.improvement__button}>Активировать</button>
    </li>
  );
};
