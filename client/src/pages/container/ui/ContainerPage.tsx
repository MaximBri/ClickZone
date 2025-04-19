import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/store";

import { DOMAIN, routes } from "@/shared/config/routes";
import { buyContainer } from "@/entities/user/containers/buyContainer";
import coinSvg from "/images/resources/coin.svg";
import diamondSvg from "/images/resources/diamond.svg";
import styles from "./ContainerPage.module.scss";
import { getFinances } from "@/entities/user/model/selectors";
import { getContainers } from "@/entities/user/containers/thunks/getContainers.thunk";
import { useEffect } from "react";

export const ContainerPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userFinances = useAppSelector(getFinances);
  const containerList = useAppSelector(
    (state) => state.containers.allContainers
  );

  const container = containerList.find(
    (item) => item.imagePath == `${params.type}.png`
  );

  useEffect(() => {
    if (!containerList.length) {
      dispatch(getContainers());
    }
  }, [containerList, container]);

  if (!container && containerList.length) {
    navigate(routes.pages.randomizer);
    return null;
  }

  if (!container) {
    return null;
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.container__title}>{container.name} контейнер</h2>
      <img
        className={styles.container__image}
        src={`${DOMAIN}/images/containers/${container?.imagePath}`}
        alt="container"
      />
      <h3 className={styles.container__subtitle}>Купить:</h3>
      <nav className={styles.container__nav}>
        <button
          onClick={() => buyContainer(dispatch, userFinances, container, true)}
          className={styles["container__nav-button"]}
        >
          {container.price.coins} <img src={coinSvg} alt="coin" />
        </button>
        или
        <button
          onClick={() => buyContainer(dispatch, userFinances, container, false)}
          className={styles["container__nav-button"]}
        >
          {container.price.diamonds} <img src={diamondSvg} alt="coin" />
        </button>
      </nav>
      <h3 className={styles.container__title}>Что может выпасть:</h3>
      <ul className={styles.container__list}>
        {container.rewards.map((item, index) => {
          return (
            <li className={styles.container__item} key={index}>
              {item.coins && (
                <>
                  {item.coins}
                  <img
                    className={styles["container__item-coin"]}
                    src={coinSvg}
                    alt="coin"
                  />
                </>
              )}
              {item.diamonds && (
                <>
                  {item.diamonds}
                  <img
                    className={styles["container__item-diamond"]}
                    src={diamondSvg}
                    alt="diamond"
                  />
                </>
              )}
              {item.improvement_id && (
                <>
                  <h4 className={styles["container__item-count"]}>
                    x{item.count}
                  </h4>
                  <img
                    className={styles["container__item-container"]}
                    src={`${DOMAIN}/images/${item.imagePath}`}
                    alt="improvement"
                  />
                </>
              )}
              {item.container_id && (
                <>
                  <h4 className={styles["container__item-count"]}>
                    x{item.count}
                  </h4>
                  <img
                    className={styles["container__item-container"]}
                    src={`${DOMAIN}/images/${item.imagePath}`}
                    alt="container"
                  />
                </>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
