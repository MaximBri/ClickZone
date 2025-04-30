import { useEffect, useState } from "react";
import styles from "./MiglioramentiOther.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { setMiglioramentiClicks } from "../model/miglioramentiesClicksSlice";

export const MiglioramentiOther = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.miglioramentiClicks.data);
  const [isActive, setIsActive] = useState<boolean>(false);
  const closeWindow = () => {
    setIsActive(false);
    setTimeout(() => {
      dispatch(setMiglioramentiClicks(null));
    }, 300);
  };

  if (!data) return null;

  useEffect(() => {
    setIsActive(true);
  }, []);

  return (
    <>
      <div className={styles.migl__background} onClick={closeWindow}></div>
      <section className={styles.migl}>
        <h2 className={styles.migl__title}>Улучшение: {data?.name}</h2>
        <div className={styles.migl__body}></div>
        {isActive}
      </section>
    </>
  );
};
