import { FC } from "react";

import { Miglioramenti } from "@/features/clicker/miglioramenti";
import { miglioramentiList } from "../model/miglioramentiList";
import crossSvg from "./icons/cross.svg";
import styles from "./ClickerShop.module.scss";
import { useSelector } from "react-redux";
import { getFinances } from "@/entities/user/model/userSlice";

export const ClickerShop: FC<{
  active: boolean;
  closeSection: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ active, closeSection }) => {
  const userCoins = useSelector(getFinances);
  return (
    <>
      <div className={`${styles.shop} ${active ? styles["shop--active"] : ""}`}>
        <div
          className={`${styles.shop__wrapper} ${
            !active
              ? styles["shop__wrapper--closed"]
              : styles["shop__wrapper--open"]
          }`}
        >
          <img
            className={styles["shop__close-button"]}
            onClick={() => closeSection(false)}
            src={crossSvg}
            alt="close"
          />
          <h2 className={styles.shop__title}>Улучшения для кликера</h2>
          <ul className={styles.shop__list}>
            {miglioramentiList.map((item, index) => {
              return (
                <Miglioramenti
                  data={item}
                  key={index}
                  coins={userCoins.coins}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
