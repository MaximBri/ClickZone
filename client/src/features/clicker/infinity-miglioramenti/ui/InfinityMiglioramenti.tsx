import { memo } from "react";
import { useAppSelector } from "@/app/store/store";

import { DOMAIN } from "@/shared/config/routes";
import { getMiglioramenti } from "@/entities/user/model/selectors";
import styles from "./InfinityMiglioramenti.module.scss";

/**
 * Функция для отрисовки блока с постоянными улучшениями. Берёт все улучшения из хранилища и отрисовывает только те, которые являются бесконечными
 */
export const InfinityMiglioramenti = memo(() => {
  const userMiglioramenti = useAppSelector(getMiglioramenti).filter(
    (item) => item.isInfinite === true
  );
  if (!userMiglioramenti.length) return null;

  return (
    <div className={styles.list__wrapper}>
      <h3 className={styles.list__title}>Постоянные улучшения</h3>
      <ul className={styles.list}>
        {userMiglioramenti.map((item) => {
          return (
            <li key={item.id} className={styles.list__item}>
              <img
                className={styles["list__item-image"]}
                src={`${DOMAIN}/images/miglioramenti/${item.imagePath}`}
                alt="improvement"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
});
