import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { fetchAccountData } from "@/entities/user/account/thunks";
import { DOMAIN } from "@/shared/config/routes";
import styles from "./UserPage.module.scss";

interface RewardModel {
  name: string;
  has_achievement: boolean;
  imagePath?: string;
}

interface DataModel {
  nickname: string;
  about_me: string;
  timestamp: string;
  achievements: RewardModel[];
}

export const UserPage = () => {
  const dispatch = useAppDispatch();
  const props = useParams();
  const rewards = useAppSelector((state) => state.user.globals.achievements);
  const [data, setData] = useState<DataModel | null>(null);

  const getUserInfo = async () => {
    const response = await api.get(
      `${apiRoutes.getOtherAccoutInfo}?id=${props.id}`
    );
    setData(response.data);
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  const getRewards = async () => {
    await dispatch(fetchAccountData());
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    getUserInfo();
    if (!rewards.length) {
      getRewards();
    }
  }, []);

  useEffect(() => {
    console.log(rewards);
    if (
      rewards.length === data?.achievements?.length &&
      !data.achievements[0].imagePath
    ) {
      setData({ ...data, achievements: rewards });
    }
  }, [rewards, data]);

  if (!data) return <>Загрузка...</>;

  return (
    <section className={styles.user}>
      <h2 className={styles.user__name}>{data.nickname}</h2>
      <div className={styles.user__block}>
        <h3 className={styles.user__title}>Описание:</h3>
        <textarea
          className={styles.user__textarea}
          value={data.about_me}
          disabled
        ></textarea>
      </div>
      <div className={styles.user__block}>
        <h3 className={styles.user__title}>Награды:</h3>
        <ul className={styles.user__list}>
          {data.achievements.map((item) => {
            return (
              <li
                key={item.name}
                className={`${styles["user__list-item"]} ${
                  !item.has_achievement ? styles["user__list-item--grey"] : ""
                }`}
              >
                <img
                  src={`${DOMAIN}/images/rewards/${item.imagePath}`}
                  alt="reward"
                />
                <h4>{item.name}</h4>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.user__block}>
        <h3 className={styles.user__title}>Дата регистрации:</h3>
        <h4 className={styles.user__date}>{formatDate(data.timestamp)}</h4>
      </div>
    </section>
  );
};
