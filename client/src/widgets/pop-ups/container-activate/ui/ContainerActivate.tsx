import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";

import { setActiveContainer } from "@/pages/randomizer/model/containtersSlice";
import { DOMAIN } from "@/shared/config/routes";
import styles from "./ContainerActivate.module.scss";
import coinSvg from "/images/resources/coin.svg";
import diamondSvg from "/images/resources/diamond.svg";
import { RewardInterface } from "@/shared/types";

export const ContainerActivate = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.containers.activeContainer);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [rewards, setRewards] = useState<RewardInterface[] | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const targetIndex = 30;

  if (!data) return null;

  useEffect(() => {
    setIsActive(true);
    if (data.rewards) {
      setRewards(shuffle(data.rewards));
    }
  }, [data]);

  const closeWindow = () => {
    setIsActive(false);
    setTimeout(() => {
      dispatch(setActiveContainer(null));
    }, 300);
  };

  function shuffle<T>(array: T[]): T[] {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function easeInOutQuad(t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  const scrollToTarget = useCallback(() => {
    if (listRef.current && rewards) {
      const itemWidth = listRef.current.clientWidth / rewards.length; // calculate item width based on available space
      const targetScrollPosition = itemWidth * targetIndex + itemWidth / 2; //Adjusted for center
      const maxScroll =
        listRef.current.scrollWidth - listRef.current.clientWidth; //Adjusted for maximum value

      let start = scrollPosition;
      const change = targetScrollPosition - start;
      let currentTime = 0;
      const increment = 20;
      let duration = 800;

      const animateScroll = () => {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        listRef.current!.scrollLeft = val;
        setScrollPosition(val); //Update the scrollPosition here
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          listRef.current!.scrollLeft = targetScrollPosition; //Final set
          setScrollPosition(targetScrollPosition); //Update the scrollPosition here
        }
      };

      animateScroll();

      listRef.current.scrollLeft = Math.min(targetScrollPosition, maxScroll);
    }
  }, [rewards, scrollPosition, data, targetIndex]);

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
        <ul ref={listRef} className={styles.container__list}>
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
        <button onClick={scrollToTarget} className={styles.container__button}>
          Крутить!
        </button>
      </section>
    </>
  );
};
