import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { useEffect } from "react";

import { DOMAIN, routes } from "@/shared/config/routes";
import { buyContainer } from "@/entities/user/containers/buyContainer";
import { getFinances } from "@/entities/user/model/selectors";
import { getContainers } from "@/entities/user/containers/thunks/getContainers.thunk";
import { ContainerRewards } from "@/features/randomizer/container-rewards";
import coinSvg from "/images/resources/coin.svg";
import diamondSvg from "/images/resources/diamond.svg";
import styles from "./ContainerPage.module.scss";

/**
 * Функция отвечает за отображение страницы отдельного контейнера. Включает в себя изображение контейнера, его название, описание, список того, что может выпасть.
 */
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
      <ContainerRewards rewards={container.rewards} />
    </section>
  );
};
