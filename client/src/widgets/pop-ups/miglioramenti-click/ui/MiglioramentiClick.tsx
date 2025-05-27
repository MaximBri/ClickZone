import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";

import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { notificationManager } from "../../notifications/model/notificationManager";
import { setMigliomentiClick } from "../../model/popUpsSlice";
import {
  removeOneUpgrade,
  setCoins,
  setDiamonds,
} from "@/entities/user/model/userSlice";
import circleGif from "@/shared/icons/circle.gif";
import styles from "./MiglioramentiClick.module.scss";

/**
 * Функция отвечает за открытие всплывающего окна с активацией мгновенных улучшений и всю необходимую логику.
 */
export const MiglioramentiClick = () => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState<boolean>(false);
  const id = useAppSelector((state) => state.windows.miglioramentiClick);
  if (!id) return null;

  useEffect(() => {
    setIsActive(true);
  }, []);

  /**
   * Функция для плавного закрытия окна
   */
  const closeWindow = () => {
    setIsActive(false);
    setTimeout(() => {
      dispatch(setMigliomentiClick(null));
    }, 300);
  };

  /**
   * Асинхронная функция для активации улучшения. Отправляет запрос на бэкенд и начисляет награду на фронтенде для синхронизации с бэкендом
   */
  const activate = async () => {
    try {
      const response = await api.post(apiRoutes.activateMiglioramenti, { id });
      dispatch(removeOneUpgrade(id));
      dispatch(setCoins(response.data.user_coins));
      dispatch(setDiamonds(response.data.user_diamonds));
      notificationManager(dispatch, response.data.msg, "success");
    } catch (error) {
      console.error(error);
      notificationManager(
        dispatch,
        "Ошибка при активации улучшения. Оно не было списано",
        "error"
      );
    } finally {
      closeWindow();
    }
  };

  return (
    <>
      <div
        onClick={closeWindow}
        className={`${styles.migl__background} ${
          !isActive ? styles["migl--hidden"] : ""
        }`}
      ></div>
      <section
        className={`${styles.migl__body} ${
          !isActive ? styles["migl--hidden"] : ""
        }`}
      >
        <h2 className={styles["migl__body-title"]}>
          Кликните, чтобы испытать удачу
        </h2>
        <button onClick={activate} className={styles.migl__clicker}>
          <img src={circleGif} alt="circle" />
        </button>
      </section>
    </>
  );
};
