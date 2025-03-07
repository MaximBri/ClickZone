import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { animalsList } from '@/pages/home/model/animalsList';
import {
  getCoinsOnClick,
  getFinances,
  getLevel,
  setCoins,
  setLevel,
} from '@/entities/user/model/userSlice';

export const animalModel = () => {
  const dispatch = useDispatch();
  const coinsRequiredForNextLevel = 1;
  const level = useSelector(getLevel);
  const finances = useSelector(getFinances);
  const countCoinsOnClick = useSelector(getCoinsOnClick);
  const pet = animalsList[level - 1];
  const coinsToNextLevel =
    level > 9
      ? 'Максимальный уровень'
      : `Нужно монет для следующего уровня: ${
          coinsRequiredForNextLevel * 5 * Math.pow(level, 1)
        }`;
  const [clicks, setClicks] = useState<
    Array<{ x: number; y: number; id: number }>
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
    
    dispatch(setCoins());
  };

  useEffect(() => {
    if (finances.coins >= coinsRequiredForNextLevel * Math.pow(level, 1) * 5) {
      dispatch(setLevel(level + 1));
    }
  }, [finances.coins, level, dispatch]);

  return { addCoins, pet, clicks, countCoinsOnClick, coinsToNextLevel };
};
