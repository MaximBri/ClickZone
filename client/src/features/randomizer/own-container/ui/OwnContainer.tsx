import { FC } from "react";

import { DOMAIN } from "@/shared/config/routes";
import { ContainerSliceInterface } from "@/shared/types";
import keySvg from "/images/containers/key.svg";
import styles from "./OwnContainer.module.scss";

export const OwnContainer: FC<{ data: ContainerSliceInterface }> = ({
  data,
}) => {
  return (
    <li className={styles.container}>
      <img
        className={styles.container__image}
        src={`${DOMAIN}/images/containers/${data.imagePath}`}
        alt="container"
      />
      <h4 className={styles.container__name}>{data.name}</h4>
      {data.count > 1 && (
        <div className={styles.container__count}>x{data.count}</div>
      )}
      <div className={styles.container__nav}>
        <button className={styles.container__button}>Открыть</button>
        <button className={styles["container__button-key"]}>
          <img src={keySvg} alt="key" />
        </button>
      </div>
    </li>
  );
};
