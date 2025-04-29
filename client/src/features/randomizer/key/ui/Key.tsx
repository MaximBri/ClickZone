import { store, useAppDispatch, useAppSelector } from "@/app/store/store";

import { DOMAIN } from "@/shared/config/routes";
import { key } from "@/pages/randomizer/model/containerList";
import { getFinances } from "@/entities/user/model/selectors";
import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";
import { setContainerKeys } from "@/pages/randomizer/model/containtersSlice";
import coinSvg from "/images/resources/coin.svg";
import styles from "./Key.module.scss";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { api } from "@/shared/api/base";
import { setCoins } from "@/entities/user/model/userSlice";

export const Key = () => {
  const dispatch = useAppDispatch();
  const keys = useAppSelector((state) => state.containers.keys);
  const userFinances = useAppSelector(getFinances);
  const buyOneKey = async () => {
    if (userFinances.coins >= key.price) {
      const coins = store.getState().user.finances.coins;
      try {
        await api.post(apiRoutes.buyKey, { amount: 1 });
        dispatch(setContainerKeys(keys + 1));
        dispatch(setCoins(coins - key.price));
        notificationManager(
          dispatch,
          `Куплен ключ. Списано монет: ${key.price}`,
          "success"
        );
      } catch (error) {
        console.error(error);
        notificationManager(
          dispatch,
          `Произошла ошибка при покупке ключа`,
          "error"
        );
      }
    } else {
      notificationManager(dispatch, "Недостаточно ресурсов", "warning");
    }
  };

  return (
    <li className={styles.key}>
      <img
        className={styles.key__image}
        src={`${DOMAIN}/images/containers/${key.imagePath}`}
        alt="key"
      />
      <h4 className={styles.key__name}>{key.name}</h4>
      <p className={styles.key__description}>{key.description}</p>
      <button onClick={buyOneKey} className={styles.key__button}>
        {key.price}
        <img src={coinSvg} alt="coin" />
      </button>
    </li>
  );
};
