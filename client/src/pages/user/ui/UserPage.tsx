import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { useAppSelector } from "@/app/store/store";
import { DOMAIN } from "@/shared/config/routes";
import { achievementsImagesPaths } from "@/entities/user/model/achievementsImagesPaths";
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

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (
      rewards.length === data?.achievements?.length &&
      !data.achievements[0].imagePath
    ) {
      setData({ ...data, achievements: rewards });
    }
  }, [rewards, data]);

  if (!data) return <h2 className={styles.user__loading}>Загрузка...</h2>;

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
          {data.achievements.map((item, index) => {
            return (
              <li
                key={item.name}
                className={`${styles["user__list-item"]} ${
                  !item.has_achievement ? styles["user__list-item--grey"] : ""
                }`}
              >
                <img
                  src={`${DOMAIN}/images/rewards/${achievementsImagesPaths[index]}`}
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
