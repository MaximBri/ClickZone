import { useAppDispatch } from "@/app/store/store";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

import { setTutorial } from "../../model/popUpsSlice";
import { clickerTutorialText } from "../model/clickerTutorialText";
import crossSvg from "@/shared/icons/cross.svg";
import styles from "./ClickerTutorial.module.scss";

export const ClickerTutorial = () => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState<boolean>(false);

  const buttonHandle = () => {
    setIsActive(false);
    setTimeout(() => {
      dispatch(setTutorial({ key: "clicker", value: false }));
    }, 300);
  };

  useEffect(() => {
    setIsActive(true);
  }, []);

  return (
    <>
      <div
        className={`${styles.tutorial__background} ${
          isActive ? "" : styles["tutorial--hidden"]
        }`}
        onClick={buttonHandle}
      ></div>
      <section
        className={`${styles.tutorial}  ${
          isActive ? "" : styles["tutorial--hidden"]
        }`}
      >
        <h2 className={styles.tutorial__title}>Обучение</h2>
        <button className={styles.tutorial__close} onClick={buttonHandle}>
          <img src={crossSvg} alt="close" />
        </button>
        <div className={styles.tutorial__body}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {clickerTutorialText}
          </ReactMarkdown>
          <button
            onClick={buttonHandle}
            className={styles["tutorial__body-button"]}
          >
            Закрыть
          </button>
        </div>
      </section>
    </>
  );
};
