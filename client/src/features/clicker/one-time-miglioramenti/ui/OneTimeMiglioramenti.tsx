import { FC } from "react";
import { useAppDispatch } from "@/app/store/store";

import { DOMAIN } from "@/shared/config/routes";
import { UpgradeInterface } from "@/shared/types";
import {
  setImprovements,
  setMigliomentiClick,
} from "@/widgets/pop-ups/model/popUpsSlice";
import styles from "./OneTimeMiglioramenti.module.scss";

export const OneTimeMiglioramenti: FC<{
  data: UpgradeInterface;
}> = ({ data }) => {
  const dispatch = useAppDispatch();
  const activate = () => {
    if ([2, 3, 4, 5].includes(data.id)) {
      dispatch(setImprovements(false));
      dispatch(setMigliomentiClick(data.id));
    }
  };

  return (
    <li className={styles.improvement}>
      <h4 className={styles.improvement__name}>
        {data.name}
        {data.count > 1 && (
          <>
            ,{" "}
            <strong className={styles.improvement__count}>x{data.count}</strong>
          </>
        )}
      </h4>
      <img
        className={styles.improvement__image}
        src={`${DOMAIN}/images/miglioramenti/${data.imagePath}`}
        alt="improvement"
      />
      <p className={styles.improvement__description}>{data.description}</p>
      <button className={styles.improvement__button} onClick={activate}>
        Активировать
      </button>
    </li>
  );
};
