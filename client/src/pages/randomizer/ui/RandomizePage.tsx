import { useAppSelector } from "@/app/store/store";
import infoSvg from "@/shared/icons/info.svg";
import styles from "./RandomizePage.module.scss";

export const RandomizePage = () => {
  const userContainers = useAppSelector((state) => state.user.containers);
  return (
    <section className={styles.containers}>
      <h2 className={styles.containers__title}>Рандомайзер</h2>
      <h3 className={styles.containers__subtitle}>Здесь вы можете купить контейнеры</h3>
      <button className={styles.containers__info}>
        <img src={infoSvg} alt="info" />
      </button>
      {userContainers.length > 0 && <ul>{/* Контейнеры юзера */}</ul>}
    </section>
  );
};
