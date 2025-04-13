import { useSelector } from "react-redux";

import { getFinances } from "@/entities/user/model/selectors";
import coinSvg from "/images/resources/coin.svg";
import diamondSvg from "/images/resources/diamond.svg";
import styles from "../Footer.module.scss";

export const UserFinanceInfo = () => {
  const finances = useSelector(getFinances);
  return (
    <span className={styles.footer__center}>
      <span className={styles["footer__center-item"]}>
        <img src={coinSvg} alt="coins" /> {finances.coins}
      </span>
      <span className={styles["footer__center-item"]}>
        <img src={diamondSvg} alt="diamonds" /> {finances.diamonds}
      </span>
    </span>
  );
};
