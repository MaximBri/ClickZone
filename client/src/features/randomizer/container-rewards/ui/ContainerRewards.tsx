import { DOMAIN } from "@/shared/config/routes";
import { RewardInterface } from "@/shared/types";
import coinSvg from "/images/resources/coin.svg";
import diamondSvg from "/images/resources/diamond.svg";
import styles from "./ContainerRewards.module.scss";

export const ContainerRewards = ({
  rewards,
}: {
  rewards: RewardInterface[];
}) => {
  return (
    <ul className={styles.container__list}>
      {rewards.map((item, index) => {
        return (
          <li className={styles.container__item} key={index}>
            {item.coins && (
              <>
                {item.coins}
                <img
                  className={styles["container__item-coin"]}
                  src={coinSvg}
                  alt="coin"
                />
              </>
            )}
            {item.diamonds && (
              <>
                {item.diamonds}
                <img
                  className={styles["container__item-diamond"]}
                  src={diamondSvg}
                  alt="diamond"
                />
              </>
            )}
            {item.improvement_id && (
              <>
                <h4 className={styles["container__item-count"]}>
                  x{item.count}
                </h4>
                <img
                  className={styles["container__item-container"]}
                  src={`${DOMAIN}/images/${item.imagePath}`}
                  alt="improvement"
                />
              </>
            )}
            {item.container_id && (
              <>
                <h4 className={styles["container__item-count"]}>
                  x{item.count}
                </h4>
                <img
                  className={styles["container__item-container"]}
                  src={`${DOMAIN}/images/${item.imagePath}`}
                  alt="container"
                />
              </>
            )}
            {item.keys && (
              <>
                <h4 className={styles["container__item-count"]}>
                  x{item.keys}
                </h4>
                <img
                  className={styles["container__item-container"]}
                  src={`${DOMAIN}/images/containers/key.svg`}
                  alt="key"
                />
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};
