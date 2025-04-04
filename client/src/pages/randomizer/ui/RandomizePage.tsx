import { useAppDispatch, useAppSelector } from "@/app/store/store";

import { containerList } from "../model/containerList";
import { Container } from "@/features/randomizer/container";
import infoSvg from "@/shared/icons/info.svg";
import styles from "./RandomizePage.module.scss";
import { setTutorial } from "@/widgets/pop-ups/model/popUpsSlice";

export const RandomizePage = () => {
  const dispatch = useAppDispatch();
  const userContainers = useAppSelector((state) => state.user.containers);

  return (
    <section className={styles.containers}>
      <h2 className={styles.containers__title}>Рандомайзер</h2>
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
          <ul>{/* Контейнеры юзера */}</ul>
        </>
      )}
      <h3 className={styles.containers__subtitle}>Магазин контейнеров</h3>
      <ul className={styles.containers__shop}>
        {containerList.map((item) => {
          return <Container data={item} />;
        })}
      </ul>
    </section>
  );
};
