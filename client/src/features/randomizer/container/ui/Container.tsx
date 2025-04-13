import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { useNavigate } from "react-router-dom";

import { DOMAIN } from "@/shared/config/routes";
import { buyContainer } from "@/entities/user/containers/buyContainer";
import { getFinances } from "@/entities/user/model/selectors";
import { ContainerInterface } from "@/shared/types";
import coinSvg from "/images/resources/coin.svg";
import diamondSvg from "/images/resources/diamond.svg";
import infoSvg from "@/shared/icons/info.svg";
import styles from "./Container.module.scss";

export const Container: FC<{ data: ContainerInterface }> = ({ data }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userFinances = useAppSelector(getFinances);

  return (
    <li className={styles.container}>
      <img
        className={styles.container__image}
        src={`${DOMAIN}/images/containers/${data.imagePath}`}
        alt="container"
      />
      <button
        className={styles.container__info}
        onClick={() =>
          navigate(`${data.imagePath.slice(0, data.imagePath.length - 4)}`)
        }
      >
        <img src={infoSvg} alt="info" />
      </button>
      <h3 className={styles.container__name}>{data.name}</h3>
      <nav className={styles.container__nav}>
        <button
          onClick={() => buyContainer(dispatch, userFinances, data, true)}
          className={styles["container__nav-button"]}
        >
          {data.price.coins} <img src={coinSvg} alt="coin" />
        </button>
        <button
          onClick={() => buyContainer(dispatch, userFinances, data, false)}
          className={styles["container__nav-button"]}
        >
          {data.price.diamonds} <img src={diamondSvg} alt="coin" />
        </button>
      </nav>
    </li>
  );
};
