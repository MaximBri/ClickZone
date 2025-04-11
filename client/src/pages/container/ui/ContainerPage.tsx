import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/store";

import { containerList } from "@/pages/randomizer/model/containerList";
import { DOMAIN, routes } from "@/shared/config/routes";
import { buyContainer } from "@/entities/user/containers/buyContainer";
import coinSvg from "/images/resources/coin.svg";
import diamondSvg from "/images/resources/diamond.svg";
import styles from "./ContainerPage.module.scss";
import { getFinances } from "@/entities/user/model/selectors";

export const ContainerPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userFinances = useAppSelector(getFinances);
  const container = containerList.find(
    (item) => item.imagePath == `${params.type}.png`
  );

  if (!container) {
    navigate(routes.pages.randomizer);
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
      <nav className={styles.container__nav}>
        <button
          onClick={() => buyContainer(dispatch, userFinances, container, true)}
          className={styles["container__nav-button"]}
        >
          {container.price.coins} <img src={coinSvg} alt="coin" />
        </button>
        <button
          onClick={() => buyContainer(dispatch, userFinances, container, false)}
          className={styles["container__nav-button"]}
        >
          {container.price.diamonds} <img src={diamondSvg} alt="coin" />
        </button>
      </nav>
      <ul>
        {container.rewards.map((item) => {
          console.log(item);
          return <li></li>;
        })}
      </ul>
    </section>
  );
};
