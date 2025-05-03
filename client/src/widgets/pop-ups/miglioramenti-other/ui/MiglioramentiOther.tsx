import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";

import { setMiglioramentiClicks } from "../model/miglioramentiesClicksSlice";
import { activateMiglioramentiThunk } from "@/entities/user/miglioramenti/thunks/activateMiglioramentiThunk";
import { notificationManager } from "../../notifications/model/notificationManager";
import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import {
  addCountOfCoins,
  removeOneUpgrade,
} from "@/entities/user/model/userSlice";
import circleGif from "@/shared/icons/circle.gif";
import crossSvg from "@/shared/icons/cross.svg";
import styles from "./MiglioramentiOther.module.scss";

const texts = [
  "Следующие 50 кликов будут приносить х2 монет, вперёд!",
  "Следующие 5 кликов будут приносить х10 монет, вперёд кликать!",
  "У тебя есть 10 секунд на подготовку и 30 секунд, чтобы накликать как можно больше, вперёд!",
];

export const MiglioramentiOther = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.miglioramentiClicks.data);
  const miglData = [
    { count: 50, multiply: 2 },
    { count: 5, multiply: 10 },
    { multiply: 1, count: 10000 },
  ];
  const [isActive, setIsActive] = useState<boolean>(false);
  const [animalIsVisible, setAnimalIsVisible] = useState(false);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [countClicks, setCountClicks] = useState<number>(0);
  const [popups, setPopups] = useState<
    { id: number; x: number; y: number; value: number }[]
  >([]);
  const popupId = useRef(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const countCoinsOnClick = useAppSelector((state) => state.user.coinsOnClick);
  const closeWindow = () => {
    if (!animalIsVisible) {
      setIsActive(false);
      setTimeout(() => {
        dispatch(setMiglioramentiClicks(null));
      }, 300);
    }
  };
  if (!data) return null;

  const finish = () => {
    setAnimalIsVisible(false);
  };

  const calculateCountOfCoins = () => {
    return countCoinsOnClick * countClicks * miglData[data.id - 6].multiply;
  };

  const deactivateMiglioramenti = async () => {
    const response = await api.post(apiRoutes.deactivateMigliorament, {
      id: data.id,
    });
    console.log(response);
  };

  const activateMiglioramenti = async () => {
    const response = await api.post(apiRoutes.activateMiglioramenti, {
      id: data.id,
    });
    console.log(response.data);
  };

  const buttonHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCountClicks(countClicks + 1);
    if (countClicks + 1 >= miglData[data.id - 6].count) {
      finish();
      setIsFinish(true);
    }
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPopups((prev) => [
        ...prev,
        {
          id: popupId.current++,
          x,
          y,
          value: countCoinsOnClick * miglData[data.id - 6].multiply,
        },
      ]);
    }
  };

  useEffect(() => {
    if (data.id === 6) {
      setAnimalIsVisible(true);
      activateMiglioramenti();
    } else if (data.id === 7) {
      setAnimalIsVisible(true);
      activateMiglioramenti();
    } else if (data.id === 8) {
      setTimeout(() => {
        setAnimalIsVisible(true);
        activateMiglioramenti();
        setTimeout(() => {
          setIsFinish(true);
          finish();
        }, 30000);
      }, 10000);
    }
    setIsActive(true);
    dispatch(activateMiglioramentiThunk(data.id));
    notificationManager(
      dispatch,
      "Не перезагружайте страницу и не пытайтесь закрыть это окно, иначе улучшение будет списано!",
      "warning"
    );
  }, []);

  useEffect(() => {
    if (isFinish) {
      try {
        deactivateMiglioramenti();
        dispatch(addCountOfCoins(calculateCountOfCoins()));
        notificationManager(
          dispatch,
          `Получено монет: ${calculateCountOfCoins()}`,
          "success"
        );
        dispatch(removeOneUpgrade(data.id));
        closeWindow();
      } catch (error) {
        console.error(error);
        notificationManager(dispatch, "Что-то пошло не так :(", "error");
      }
    }
  }, [isFinish]);

  useEffect(() => {
    if (popups.length === 0) return;
    const timer = setTimeout(() => {
      setPopups((prev) => prev.slice(1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [popups]);

  return (
    <>
      <div
        className={`${styles.migl__background} ${
          !isActive ? styles["migl--hidden"] : ""
        }`}
        onClick={closeWindow}
      ></div>
      <section
        className={`${styles.migl} ${!isActive ? styles["migl--hidden"] : ""}`}
      >
        <h2 className={styles.migl__title}>Улучшение: {data?.name}</h2>
        <p className={styles.migl__subtitle}>{texts[data.id - 6]}</p>
        {!animalIsVisible && (
          <button onClick={closeWindow} className={styles.migl__close}>
            <img src={crossSvg} alt="close" />
          </button>
        )}
        {animalIsVisible && (
          <button
            ref={buttonRef}
            className={styles.migl__button}
            onClick={buttonHandle}
          >
            <img src={circleGif} alt="circle" />
            {popups.map((popup) => (
              <span
                key={popup.id}
                className={styles.popup}
                style={{
                  left: popup.x,
                  top: popup.y,
                }}
              >
                +{popup.value}
              </span>
            ))}
          </button>
        )}
        <p className={styles.migl__reward}>
          Получено монет: {calculateCountOfCoins()}
        </p>
      </section>
    </>
  );
};
