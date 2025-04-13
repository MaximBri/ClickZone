import { useAppDispatch, useAppSelector } from "@/app/store/store";

import { containerList, key } from "../model/containerList";
import { setTutorial } from "@/widgets/pop-ups/model/popUpsSlice";
import { Container } from "@/features/randomizer/container";
import { OwnContainer } from "@/features/randomizer/own-container";
import { Key } from "@/features/randomizer/key";
import infoSvg from "@/shared/icons/info.svg";
import styles from "./RandomizePage.module.scss";
import { DOMAIN } from "@/shared/config/routes";

export const RandomizePage = () => {
  const dispatch = useAppDispatch();
  const userContainers = useAppSelector((state) => state.containers.data);
  const userKeys = useAppSelector((state) => state.containers.keys);

  return (
    <section className={styles.containers}>
      <h2 className={styles.containers__title}>Рандомайзер</h2>
      <div className={styles.containers__key}>
        {userKeys}
        <img
          className={styles.key__image}
          src={`${DOMAIN}/images/containers/${key.imagePath}`}
          alt="key"
        />
      </div>
      <button
        className={styles.containers__info}
        onClick={() =>
          dispatch(setTutorial({ key: "randomizer", value: true }))
        }
      >
        <img src={infoSvg} alt="info" />
      </button>
      {userContainers.length > 0 && (
        <>
          <h3 className={styles.containers__subtitle}>Ваши контейнеры</h3>
          <ul className={styles.containers__shop}>
            {userContainers.map((item) => {
              return <OwnContainer data={item} key={item.name} />;
            })}
          </ul>
        </>
      )}
      <h3 className={styles.containers__subtitle}>Магазин</h3>
      <h3 className={styles["containers__shop-title"]}>Контейнеры:</h3>
      <ul className={styles.containers__shop}>
        {containerList.map((item) => {
          return <Container data={item} key={item.name} />;
        })}
      </ul>
      <h3 className={styles["containers__shop-title"]}>Ключи:</h3>
      <ul className={styles.containers__shop}>
        <Key />
      </ul>
    </section>
  );
};
