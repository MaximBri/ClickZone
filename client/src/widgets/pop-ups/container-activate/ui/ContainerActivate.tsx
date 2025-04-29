import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";

import { setActiveContainer } from "@/pages/randomizer/model/containtersSlice";
import { DOMAIN } from "@/shared/config/routes";
import { RewardInterface } from "@/shared/types";
import styles from "./ContainerActivate.module.scss";
import coinSvg from "/images/resources/coin.svg";
import diamondSvg from "/images/resources/diamond.svg";

export const ContainerActivate = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.containers.activeContainer);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [rewards, setRewards] = useState<RewardInterface[] | null>(null);

  useEffect(() => {
    setRewards(null)
  }, [])

  if (!data) return null;

  useEffect(() => {
    setIsActive(true);
  }, [data]);

  const closeWindow = () => {
    setIsActive(false);
    setTimeout(() => {
      dispatch(setActiveContainer(null));
    }, 300);
  };

  const activate = () => {

  }

  return (
    <>
      <div
        onClick={closeWindow}
        className={`${styles.container__background} ${
          isActive ? "" : styles["container--hidden"]
        }`}
      ></div>
      <section
        className={`${styles.container} ${
          isActive ? "" : styles["container--hidden"]
        }`}
      >
        <h2 className={styles.container__title}>{`Контейнер ${data.name}`}</h2>
        <ul className={styles.container__list}>
          {rewards &&
            rewards.map((item, index) => {
              if (item.coins) {
                return (
                  <li
                    key={index}
                    className={styles["container__list-item--resource"]}
                  >
                    <img src={coinSvg} alt="coin" />
                    {item.coins}
                  </li>
                );
              }
              if (item.diamonds) {
                return (
                  <li
                    key={index}
                    className={styles["container__list-item--resource"]}
                  >
                    <img src={diamondSvg} alt="diamond" />
                    {item.diamonds}
                  </li>
                );
              }
              if (item.container_id) {
                return (
                  <li
                    key={index}
                    className={styles["container__list-item--container"]}
                  >
                    <img
                      src={`${DOMAIN}/images/${item.imagePath}`}
                      alt="container"
                    />
                    {item.count}
                  </li>
                );
              }
              return (
                <li
                  key={index}
                  className={styles["container__list-item--miglioramenti"]}
                >
                  <img
                    src={`${DOMAIN}/images/${item.imagePath}`}
                    alt="miglioramenti"
                  />
                  {item.count}
                </li>
              );
            })}
          <div className={styles["container__list-separator"]}></div>
        </ul>
        <button onClick={activate} className={styles.container__button}>
          Крутить!
        </button>
      </section>
    </>
  );
};
