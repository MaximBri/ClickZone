import { FC } from "react";

import { DOMAIN } from "@/shared/config/routes";
import { miglioramentiInterface } from "@/widgets/clicker-shop/model/miglioramentiList";
import coinSvg from "/images/resourses/coin.svg";
import infinitySvg from "/images/miglioramenti/infinity.svg";
import styles from "./Miglioramenti.module.scss";
import { miglioramentiModel } from "../model/miglioramentiModel";

export const Miglioramenti: FC<{
  data: miglioramentiInterface;
  coins: number;
}> = ({ data, coins }) => {
  const { buyImprovement, haveThisMiglioramenti } = miglioramentiModel(data);
  return (
    <li className={styles.miglioramenti}>
      <div className={styles.miglioramenti__about}>
        <img
          className={styles.miglioramenti__image}
          src={`${DOMAIN}/images/miglioramenti/${data.imagePath}`}
          alt="icon"
        />
        <h3 className={styles.miglioramenti__name}>{data.name}</h3>
      </div>
      <p className={styles.miglioramenti__description}>{data.description}</p>
      <div className={styles.miglioramenti__buy}>
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
          disabled={coins < data.cost || haveThisMiglioramenti}
          onClick={() => buyImprovement(data.id)}
        >
          {haveThisMiglioramenti ? "Уже есть" : "Купить"}
        </button>
      </div>
      {data.isInfinite && (
        <img
          className={styles.miglioramenti__icon}
          src={infinitySvg}
          alt="decore"
        />
      )}
    </li>
  );
};
