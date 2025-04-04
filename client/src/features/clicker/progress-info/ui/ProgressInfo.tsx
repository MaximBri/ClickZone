import { useAppSelector } from "@/app/store/store";
import styles from "./ProgressInfo.module.scss";

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
