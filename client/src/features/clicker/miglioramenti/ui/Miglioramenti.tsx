import { FC } from "react";

import { DOMAIN } from "@/shared/config/routes";
import { miglioramentiInterface } from "@/widgets/clicker-shop/model/miglioramentiList";
import coinSvg from "/images/resourses/coin.svg";
import styles from "./Miglioramenti.module.scss";

export const Miglioramenti: FC<{
  data: miglioramentiInterface;
  coins: number;
}> = ({ data, coins }) => {
  return (
    <li className={styles.miglioramenti}>
      <img
        className={styles.miglioramenti__image}
        src={`/${DOMAIN}/images/miglioramenti/${data.imagePath}`}
        alt="icon"
      />
      <h3 className={styles.miglioramenti__name}>{data.name}</h3>
      <p className={styles.miglioramenti__description}>{data.description}</p>
      <h4 className={styles.miglioramenti__price}>
        {data.cost}
        <img
          className={styles["miglioramenti__description-coin"]}
          src={coinSvg}
          alt="coin"
        />
      </h4>
      <button
        className={styles.miglioramenti__button}
        disabled={coins < data.cost}
      >
        Купить
      </button>
    </li>
  );
};
