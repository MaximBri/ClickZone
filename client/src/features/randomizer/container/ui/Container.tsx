import { FC } from "react";

import { ContainerInterface } from "@/shared/types";
import { DOMAIN } from "@/shared/config/routes";
import coinSvg from "/images/resourses/coin.svg";
import diamondSvg from "/images/resourses/diamond.svg";
import styles from "./Container.module.scss";

export const Container: FC<{ data: ContainerInterface }> = ({ data }) => {

  

  return (
    <li className={styles.container}>
      <img
        className={styles.container__image}
        src={`${DOMAIN}/images/containers/${data.imagePath}`}
        alt="container"
      />
      <h3 className={styles.container__name}>{data.name}</h3>
      <nav className={styles.container__nav}>
        <button className={styles["container__nav-button"]}>
          {data.price.coins} <img src={coinSvg} alt="coin" />
        </button>
        <button className={styles["container__nav-button"]}>
          {data.price.diamonds} <img src={diamondSvg} alt="coin" />
        </button>
      </nav>
    </li>
  );
};
