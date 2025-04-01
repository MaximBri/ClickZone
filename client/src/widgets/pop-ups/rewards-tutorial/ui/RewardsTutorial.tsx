import ReactMarkdown from "react-markdown";
import { useAppDispatch } from "@/app/store/store";
import { useEffect, useState } from "react";

import { rewardsTutorialText } from "../model/rewardsTutorialText";
import { setTutorial } from "../../model/popUpsSlice";
import closeSvg from "@/shared/icons/cross.svg";
import styles from "./RewardsTutorial.module.scss";

export const RewardsTutorial = () => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState<boolean>(false);

  const closeWindow = () => {
    setIsActive(!isActive);
    setTimeout(() => {
      dispatch(setTutorial({ key: "rewards", value: false }));
    }, 300);
  };

  useEffect(() => {
    setIsActive(true);
  }, []);

  return (
    <>
      <div
        onClick={closeWindow}
        className={`${styles.tutorial__background} ${
          isActive ? "" : styles["tutorial--hidden"]
        }`}
      ></div>
      <section
        className={`${styles.tutorial} ${
          isActive ? "" : styles["tutorial--hidden"]
        }`}
      >
        <button className={styles.tutorial__close} onClick={closeWindow}>
          <img src={closeSvg} alt="close" />
        </button>
        <h3 className={styles.tutorial__title}>О наградах:</h3>
        <div className={styles.tutorial__body}>
          <ReactMarkdown>{rewardsTutorialText}</ReactMarkdown>
        </div>
      </section>
    </>
  );
};
