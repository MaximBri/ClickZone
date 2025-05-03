import { useAppSelector } from "@/app/store/store";
import styles from "./ProgressInfo.module.scss";

/**
 * Функция для отрисовки блока с информацией о количестве монет за клик и в минуту. Используется на главной странице
 */
export const ProgressInfo = () => {
  const coinsOnClick = useAppSelector((state) => state.user.coinsOnClick);
  const coinsPerMinute = useAppSelector((state) => state.user.coinsPerMinute);
  return (
    <ul className={styles.progress}>
      <li>Монет за клик: {coinsOnClick}</li>
      <li>Монет в минуту: {coinsPerMinute}</li>
    </ul>
  );
};
