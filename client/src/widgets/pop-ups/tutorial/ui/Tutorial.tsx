import { FC, useEffect, useState } from "react";
import { useAppDispatch } from "@/app/store/store";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

import { setTutorial, tutorialsType } from "../../model/popUpsSlice";
import crossSvg from "@/shared/icons/cross.svg";
import styles from "./PopUpTutorialPattern.module.scss";

/**
 * Функция отвечает за отрисовку info-окна. На входе принимается объект, который содержит в себе заголовок, сам тип info-окна, текст
 * @param param - принимает заголовок, название info-окна, текст, который будет показан
 */
export const Tutorial: FC<{
  data: { title: string; tutorialName: tutorialsType; text: string };
}> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState<boolean>(false);

  const buttonHandle = () => {
    setIsActive(false);
    setTimeout(() => {
      dispatch(setTutorial({ key: data.tutorialName, value: false }));
    }, 300);
  };

  useEffect(() => {
    setIsActive(true);
  }, []);

  return (
    <>
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
          <h2 className={styles.tutorial__title}>{data.title}</h2>
          <button className={styles.tutorial__close} onClick={buttonHandle}>
            <img src={crossSvg} alt="close" />
          </button>
          <div className={styles.tutorial__body}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {data.text}
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
    </>
  );
};
