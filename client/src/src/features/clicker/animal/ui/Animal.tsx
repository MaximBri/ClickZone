import { DOMAIN } from "@/shared/config/routes";
import { animalModel } from "../model/animalModel";
import styles from "./Animal.module.scss";

export const Animal = () => {
  const data = animalModel();

  return (
    <div className={styles.animal}>
      <h2 className={styles.animal__title}>{data.pet.name}</h2>
      <button
        className={styles.animal__button}
        onClick={(e) => data.addCoins(e)}
      >
        <img
          className={styles["animal__button-image"]}
          src={`${DOMAIN}/images/animals/${data.pet.image_path}`}
          alt="pet"
          draggable={false}
        />
        {data.clicks.map((click) => (
          <div
            key={click.id}
            className={styles.clickFeedback}
            style={{
              left: `${click.x}px`,
              top: `${click.y}px`,
            }}
          >
            +{data.countCoinsOnClick}
          </div>
        ))}
      </button>
      <h3 className={styles["animal__next-level"]}>{data.coinsToNextLevel}</h3>
    </div>
  );
};
