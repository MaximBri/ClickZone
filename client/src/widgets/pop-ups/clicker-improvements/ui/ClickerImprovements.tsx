import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { setImprovements } from "../../model/popUpsSlice";
import { getMiglioramenti } from "@/entities/user/model/selectors";
import { OneTimeMiglioramenti } from "@/features/clicker/one-time-miglioramenti";
import crossSvg from "@/shared/icons/cross.svg";
import styles from "./ClickerImprovements.module.scss";

/**
 * Функция отвечает за отображение всплывающего окна с мгновенными улучшениями для режима "Кликер"
 */
export const ClickerImprovements = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState<boolean>(false);
  const improvements = useSelector(getMiglioramenti).filter(
    (item) => !item.isInfinite
  );

  const closeWindow = () => {
    setActive(false);
    setTimeout(() => {
      dispatch(setImprovements(false));
    }, 300);
  };

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <>
      <div
        className={`${styles.improvements__background} ${
          active ? "" : styles["improvements--hidden"]
        }`}
        onClick={closeWindow}
      ></div>
      <section
        className={`${styles.improvements__body} ${
          active ? "" : styles["improvements--hidden"]
        }`}
      >
        <h2 className={styles.improvements__title}>
          Ваши мгновенные улучшения:
        </h2>
        <button className={styles.improvements__close} onClick={closeWindow}>
          <img src={crossSvg} alt="close" />
        </button>
        <ul className={styles.improvements__list}>
          {improvements.length > 0 ? (
            improvements.map((item) => {
              return <OneTimeMiglioramenti data={item} key={item.id} />;
            })
          ) : (
            <h2 className={styles["improvements__empty-list"]}>
              Ничего нет :(
            </h2>
          )}
        </ul>
      </section>
    </>
  );
};
