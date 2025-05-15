import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";

import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { RewardInterface } from "@/shared/types";
import { DOMAIN } from "@/shared/config/routes";
import { notificationManager } from "../../notifications/model/notificationManager";
import { getContainers } from "@/entities/user/containers/thunks/getContainers.thunk";
import { getMiglioramenti } from "@/entities/user/miglioramenti/thunks/getMiglioramenti.thunk";
import { activateMiglioramentiThunk } from "@/entities/user/miglioramenti/thunks/activateMiglioramentiThunk";
import { ContainerRewards } from "@/features/randomizer/container-rewards";
import {
  addContainerWithCount,
  removeOneContainer,
  removeOneKey,
  setActiveContainer,
  setContainerKeys,
} from "@/pages/randomizer/model/containtersSlice";
import {
  addCountOfCoins,
  addCountOfDiamonds,
  addUpgradeWithCount,
} from "@/entities/user/model/userSlice";
import coinSvg from "/images/resources/coin.svg";
import diamondSvg from "/images/resources/diamond.svg";
import styles from "./ContainerActivate.module.scss";

/**
 * Функция отвечает за отображение всплывающего окна с открытием контейнера.
 */
export const ContainerActivate = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.containers.activeContainer);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [alreadyOpen, setAlreadyOpen] = useState<boolean>(false);
  const [rewards, setRewards] = useState<RewardInterface | null>(null);
  const containers = useAppSelector((state) => state.containers.allContainers);
  const miglioramenties = useAppSelector((state) => state.miglioramenti.data);
  const keys = useAppSelector((state) => state.containers.keys);
  console.log(rewards);

  if (!data) return null;

  /**
   * Функция запрашивает список улучшений в случае, если их ещё нет в хранилище фронтенда
   */
  const getMiglioramenties = async () => {
    if (!miglioramenties.length) {
      await dispatch(getMiglioramenti());
    }
  };

  /**
   * Функция запрашивает список контейнеров у бэкенда, если их ещё нет на фронтенде
   */
  const getContainersList = async () => {
    if (!containers.length) {
      await dispatch(getContainers());
    }
  };

  useEffect(() => {
    getMiglioramenties();
    getContainersList();
  }, []);

  useEffect(() => {
    setIsActive(true);
  }, [data]);

  /**
   * Функция закрытия окна с открытием контейнера
   */
  const closeWindow = () => {
    setIsActive(false);
    setTimeout(() => {
      dispatch(setActiveContainer(null));
    }, 300);
  };

  /**
   * Асинхронная функция открытия контейнера. Срабатывает по нажатию на кнопку открытия. Запрашивает награду с бэкенда (определяет её случайно), далее отображает её пользователю и добавляет ресурсы, улучшения или контейнеры (если они выпали в качестве награды)
   */
  const activate = async () => {
    setAlreadyOpen(true);
    try {
      const response = await api.post(apiRoutes.activateContainer, {
        id: data.id,
        use_key: data.key,
      });
      let reward: RewardInterface = response.data.reward;
      if (reward.improvement_id) {
        reward = {
          ...reward,
          imagePath: miglioramenties.find(
            (item) => item.id === reward.improvement_id
          )?.imagePath,
        };
      } else if (reward.container_id) {
        reward = {
          ...reward,
          imagePath: containers.find((item) => item.id === reward.container_id)
            ?.imagePath,
        };
      }
      setRewards(reward);
      if (reward.coins) {
        dispatch(addCountOfCoins(reward.coins));
        notificationManager(
          dispatch,
          `Получено монет: ${reward.coins}`,
          "success"
        );
      } else if (reward.diamonds) {
        dispatch(addCountOfDiamonds(reward.diamonds));
        notificationManager(
          dispatch,
          `Получено алмазов: ${reward.diamonds}`,
          "success"
        );
      } else if (reward.improvement_id) {
        getMiglioramenties();
        const needMiglioramenti = miglioramenties.find(
          (item) => item.id === reward.improvement_id
        );
        if (needMiglioramenti) {
          dispatch(
            addUpgradeWithCount({ ...needMiglioramenti, count: reward.count! })
          );
          if (needMiglioramenti.isInfinite) {
            dispatch(activateMiglioramentiThunk(reward.improvement_id));
          }
          notificationManager(
            dispatch,
            `Получен(ы) улучшение(я): ${needMiglioramenti.name}. Количество: ${reward.count}`,
            "success"
          );
        } else {
          console.error("Не найдено улучшение из списка!");
          notificationManager(
            dispatch,
            "Возникла ошибка. Попробуйте перезагрузить страницу и повторить",
            "error"
          );
        }
      } else if (reward.container_id) {
        getContainersList();
        const needContainer = containers.find(
          (item) => item.id === reward.container_id
        );
        if (needContainer) {
          dispatch(
            addContainerWithCount({ ...needContainer, count: reward.count! })
          );
          notificationManager(
            dispatch,
            `Получен(ы) контейнер(ы): ${needContainer.name}. Количество: ${reward.count}`,
            "success"
          );
        } else {
          console.error("Нет нужного контейнера в хранилище");
          notificationManager(
            dispatch,
            "Возникла ошибка. Попробуйте перезагрузить страницу и повторить",
            "error"
          );
        }
      } else if (reward.keys) {
        dispatch(setContainerKeys(keys + reward.keys));
      }
      if (data.key) {
        dispatch(removeOneKey());
      }
      dispatch(removeOneContainer(data.id));
      console.log(response);
    } catch (error) {
      console.log(error);
      notificationManager(
        dispatch,
        "Произошла ошибка во время открытия контейнера. Он не был списан",
        "error"
      );
    }
  };

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
        <div className={styles.container__wrapper}>
          <h2
            className={styles.container__title}
          >{`Контейнер ${data.name}`}</h2>
          <div className={styles.container__reward}>
            {!rewards && <>Нажмите кнопку ниже, чтобы получить награду</>}
            {rewards?.coins && (
              <div className={styles.container__coins}>
                <img src={coinSvg} alt="coin" />
                {rewards.coins}
              </div>
            )}
            {rewards?.diamonds && (
              <div className={styles.container__coins}>
                <img src={diamondSvg} alt="diamond" />
                {rewards.diamonds}
              </div>
            )}
            {rewards?.container_id && (
              <div className={styles.container__container}>
                <img
                  src={`${DOMAIN}/images/containers/${rewards.imagePath}`}
                  alt="container"
                />
                <h3>Количество: {rewards.count}</h3>
              </div>
            )}
            {rewards?.improvement_id && (
              <div className={styles.container__improvement}>
                <img
                  src={`${DOMAIN}/images/miglioramenti/${rewards.imagePath}`}
                  alt="miglioramenti"
                />
                <h3>Количество: {rewards.count}</h3>
              </div>
            )}
            {rewards?.keys && (
              <div className={styles.container__improvement}>
                <img src={`${DOMAIN}/images/containers/key.svg`} alt="key" />
                <h3>Количество: {rewards.keys}</h3>
              </div>
            )}
          </div>
          {!alreadyOpen && (
            <button onClick={activate} className={styles.container__button}>
              Открыть!
            </button>
          )}
          <h3 className={styles.container__title}>Что может выпасть:</h3>
          <ContainerRewards rewards={data.rewards} />
        </div>
      </section>
    </>
  );
};
