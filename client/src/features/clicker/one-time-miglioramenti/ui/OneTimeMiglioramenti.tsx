import { FC } from "react";
import { useAppDispatch } from "@/app/store/store";

import { DOMAIN } from "@/shared/config/routes";
import { UpgradeInterface } from "@/shared/types";
import { setMiglioramentiClicks } from "@/widgets/pop-ups/miglioramenti-other/model/miglioramentiesClicksSlice";
import {
  setImprovements,
  setMigliomentiClick,
} from "@/widgets/pop-ups/model/popUpsSlice";
import styles from "./OneTimeMiglioramenti.module.scss";

/**
 * Функция для отрисовки отдельного одноразового улучшения во всплывающем окне. Содержит в себе кнопку активации, при нажатии на которую открывается то или иное окно.
 * @param {UpgradeInterface} { data }
 */
export const OneTimeMiglioramenti: FC<{
  data: UpgradeInterface;
}> = ({ data }) => {
  const dispatch = useAppDispatch();
  /**
   * Функция активации улучшений. В зависимости от id показывает то или иное всплывающее окно (связано с самими эффектами улучшений)
   */
  const activate = () => {
    if ([2, 3, 4, 5].includes(data.id)) {
      dispatch(setImprovements(false));
      dispatch(setMigliomentiClick(data.id));
    } else if ([6, 7, 8].includes(data.id)) {
      dispatch(setImprovements(false));
      dispatch(setMiglioramentiClicks(data));
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
