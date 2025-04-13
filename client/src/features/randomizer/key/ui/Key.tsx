import { useAppDispatch, useAppSelector } from "@/app/store/store";

import { DOMAIN } from "@/shared/config/routes";
import { key } from "@/pages/randomizer/model/containerList";
import { getFinances } from "@/entities/user/model/selectors";
import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";
import { setContainerKeys } from "@/pages/randomizer/model/containtersSlice";
import coinSvg from "/images/resources/coin.svg";
import styles from "./Key.module.scss";

export const Key = () => {
  const dispatch = useAppDispatch();
  const keys = useAppSelector((state) => state.containers.keys);
  const userFinances = useAppSelector(getFinances);
  const buyKey = () => {
    if (userFinances.coins >= key.price) {
      dispatch(setContainerKeys(keys + 1));
      notificationManager(
        dispatch,
        `Куплен ключ. Списано монет: ${key.price}`,
        "success"
      );
    } else {
      notificationManager(dispatch, "недостаточно ресурсов", "warning");
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
      <button onClick={buyKey} className={styles.key__button}>
        {key.price}
        <img src={coinSvg} alt="coin" />
      </button>
    </li>
  );
};
