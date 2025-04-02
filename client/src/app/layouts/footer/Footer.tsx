import { memo } from "react";
import { useAppSelector } from "@/app/store/store";

import { UserFinanceInfo } from "./model/UserFinanceInfo";
import coinSvg from "/images/resourses/coin.svg";
import styles from "./Footer.module.scss";

export const Footer = memo(() => {
  const coinsOnClick = useAppSelector((state) => state.user.coinsOnClick);
  const cointPerMinute = useAppSelector((state) => state.user.coinsPerMinute);
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__finances}>
        <h4 className={styles["footer__finances-item"]}>
          <img src={coinSvg} alt="coin"></img> за клик: {coinsOnClick}
        </h4>
        <h4 className={styles["footer__finances-item"]}>
          <img src={coinSvg} alt="coin"></img> в минуту: {cointPerMinute}
        </h4>
      </div>
      <UserFinanceInfo />
    </footer>
  );
});
