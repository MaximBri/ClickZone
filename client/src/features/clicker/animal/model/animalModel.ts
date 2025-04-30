import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { animalsList } from "@/pages/home/model/animalsList";
import { addCoin, setLevel } from "@/entities/user/model/userSlice";
import { useAppSelector } from "@/app/store/store";
import {
  getCoinsOnClick,
  getFinances,
  getLevel,
} from "@/entities/user/model/selectors";

export const animalModel = () => {
  const dispatch = useDispatch();
  const coinsRequiredForNextLevel = 1;
  const level = useSelector(getLevel);
  const finances = useSelector(getFinances);
  const countCoinsPerMinute = useAppSelector(
    (state) => state.user.coinsPerMinute
  );
  const countCoinsOnClick = useSelector(getCoinsOnClick);
  const improvements = useAppSelector((state) => state.user.clicker.upgrades);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pet = animalsList[level - 1];
  const coinsToNextLevel =
    level > 9
      ? "Максимальный уровень"
      : `Нужно монет для следующего уровня: ${
          coinsRequiredForNextLevel * 5 * Math.pow(level, 1)
        }`;
  const [clicks, setClicks] = useState<
    Array<{ x: number; y: number; id: number; value?: number }>
  >([]);

  const addCoins = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newClick = { x, y, id: Date.now() };
    setClicks((prev) => [...prev, newClick]);

    setTimeout(() => {
      setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
    }, 500);

    dispatch(addCoin());
  };

  useEffect(() => {
    const autoClicker = improvements.find((item) => item.id === 14);
    let interval: any;
    if (autoClicker) {
      interval = setInterval(() => {
        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          const x = rect.width / 2;
          const y = rect.height / 2;
          const newClick = {
            x,
            y,
            id: Date.now(),
            value: countCoinsPerMinute / 60,
          };
          setClicks((prev) => [...prev, newClick]);
          setTimeout(() => {
            setClicks((prev) =>
              prev.filter((click) => click.id !== newClick.id)
            );
          }, 500);
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [improvements, dispatch, countCoinsPerMinute]);

  useLayoutEffect(() => {
    if (finances.coins >= coinsRequiredForNextLevel * Math.pow(level, 1) * 5) {
      dispatch(setLevel(level + 1));
    }
  }, [finances.coins, level, dispatch]);

  return {
    addCoins,
    pet,
    clicks,
    countCoinsOnClick,
    coinsToNextLevel,
    buttonRef,
  };
};
