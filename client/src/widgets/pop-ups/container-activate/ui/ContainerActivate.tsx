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

  const getMiglioramenties = async () => {
    if (!miglioramenties.length) {
      await dispatch(getMiglioramenti());
    }
  };

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

  const closeWindow = () => {
    setIsActive(false);
    setTimeout(() => {
      dispatch(setActiveContainer(null));
    }, 300);
  };

  const activate = async () => {
    setAlreadyOpen(true);
    try {
      const response = await api.post(apiRoutes.activateContainer, {
        id: data.id,
        use_key: data.key,
      });
      let reward: RewardInterface = response.data.reward;
      console.log(reward);
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
        <h2 className={styles.container__title}>{`Контейнер ${data.name}`}</h2>
        <div className={styles.container__reward}>
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
        <h3 className={styles.container__title}>Что может выпасть:</h3>
        {/* <ul className={styles.container__list}>
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
        </ul> */}
        {!alreadyOpen && (
          <button onClick={activate} className={styles.container__button}>
            Крутить!
          </button>
        )}
      </section>
    </>
  );
};
