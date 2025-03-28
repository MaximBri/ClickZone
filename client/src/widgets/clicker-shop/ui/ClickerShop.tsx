import { FC } from "react";
import { useAppSelector } from "@/app/store/store";

import { Miglioramenti } from "@/features/clicker/miglioramenti";
import { miglioramentiList } from "../model/miglioramentiList";
import { getFinances, getIsAuthorized } from "@/entities/user/model/selectors";
import crossSvg from "./icons/cross.svg";
import styles from "./ClickerShop.module.scss";

export const ClickerShop: FC<{
  active: boolean;
  closeSection: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ active, closeSection }) => {
  const userCoins = useAppSelector(getFinances);
  const isAuthorized = useAppSelector(getIsAuthorized);
  if (!isAuthorized) return null;

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
            {miglioramentiList.map((item) => {
              return (
                <Miglioramenti
                  data={item}
                  key={item.id}
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
