import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";

import { setActiveContainer } from "@/pages/randomizer/model/containtersSlice";
import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";
import { DOMAIN } from "@/shared/config/routes";
import { ContainerSliceInterface } from "@/shared/types";
import keySvg from "/images/containers/key.svg";
import styles from "./OwnContainer.module.scss";

export const OwnContainer: FC<{ data: ContainerSliceInterface }> = ({
  data,
}) => {
  const dispatch = useAppDispatch();
  const userKeys = useAppSelector((state) => state.containers.keys);

  const activate = (withKey: boolean) => {
    if (withKey) {
      if (userKeys > 0) {
        dispatch(setActiveContainer({ ...data, key: true }));
      } else {
        notificationManager(dispatch, "У вас нет ключа!", "warning");
      }
    } else {
      dispatch(setActiveContainer({ ...data, key: false }));
    }
  };

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
        <button
          className={styles.container__button}
          onClick={() => activate(false)}
        >
          Открыть
        </button>
        <button
          className={styles["container__button-key"]}
          onClick={() => activate(true)}
        >
          <img src={keySvg} alt="key" />
        </button>
      </div>
    </li>
  );
};
