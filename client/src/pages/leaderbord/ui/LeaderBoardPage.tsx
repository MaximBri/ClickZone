import { useEffect, useState } from "react";

import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import coinSvg from "/images/resources/coin.svg";
import diamondSvg from "/images/resources/diamond.svg";
import styles from "./LeaderBoardPage.module.scss";

export interface PlayerModel {
  name: string;
  coins: number;
  diamonds: number;
}

export const LeaderBoardPage = () => {
  const [players, setPlayers] = useState<PlayerModel[] | null>(null);
  const [sort, setSort] = useState<"coins" | "diamonds">("coins");

  const getTopPlayers = async () => {
    try {
      const response = await api.get(`${apiRoutes.leaderboard}?sort=${sort}`);
      setPlayers(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
      setPlayers([]);
    }
  };

  const changeSort = () => {
    setSort(sort === "coins" ? "diamonds" : "coins");
  };

  useEffect(() => {
    getTopPlayers();
  }, [sort]);

  return (
    <section className={styles.leaderboard}>
      <h2 className={styles.leaderboard__title}>
        Таблица лидеров <strong>ClickZone</strong>
      </h2>
      <h3 className={styles.leaderboard__subtitle}>
        ТОП-10 игроков по
        <span onClick={changeSort}>
          {sort === "coins" ? " монетам" : " алмазам"}
        </span>
        :
      </h3>
      {players === null ? (
        <h3 className={styles.leaderboard__loading}>Загрузка...</h3>
      ) : (
        <ul className={styles.leaderboard__list}>
          <li className={styles["leaderboard__list-item"]}>
            <span></span>
            <div>Никнейм</div>
            <div>
              Количество
              <img src={coinSvg} alt="diamonds" />
            </div>
            <div>
              Количество
              <img src={diamondSvg} alt="diamonds" />
            </div>
          </li>
          {players.map((item, index) => {
            return (
              <li className={styles["leaderboard__list-item"]} key={index}>
                <span>{index + 1}</span>
                <div>{item.name}</div>
                <div>{item.coins}</div>
                <div>{item.diamonds}</div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
