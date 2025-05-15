import { FC } from "react";

import { Miglioramenti } from "@/features/clicker/miglioramenti";
import { miglioramentiModel } from "../model/miglioramentiModel";
import crossSvg from "@/shared/icons/cross.svg";
import styles from "./ClickerShop.module.scss";

/**
 *
 * @param {{active: boolean, closeSection: React.Dispatch<React.SetStateAction<boolean>>}} { active, closeSection } - объект, состоящий из 2 полей: active - отвечает за анимацию плавного повления, closeSection - функция для закрытия всплывающего окна с текущим компонентом
 */
export const ClickerShop: FC<{
  active: boolean;
  closeSection: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ active, closeSection }) => {
  const data = miglioramentiModel();
  if (!data.isAuthorized || !data.miglioramenti.length) return null;

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
            {data.miglioramenti.map((item) => {
              return (
                <Miglioramenti
                  data={item}
                  key={item.id}
                  coins={data.userCoins.coins}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
