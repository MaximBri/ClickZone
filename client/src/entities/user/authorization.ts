import { authApi } from '@/shared/api/auth';
import {
  setCoins,
  setCoinsOnClick,
  setCoinsPerMinute,
  setDataIsLoaded,
  setDescription,
  setDiamonds,
  setId,
  setIsAuthorized,
  setNickname,
} from './model/userSlice';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { authErrorInterface } from '@/shared/types';

export const authorization = async (data: {
  login: string;
  password: string;
  appDispatch: Dispatch<UnknownAction>;
  closeAuthWindow: () => void;
  setError: React.Dispatch<React.SetStateAction<authErrorInterface>>;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = data.appDispatch;
  try {
    data.setIsLoaded(true);
    const response = await authApi.sendAuth(
      data.login,
      data.password,
      dispatch
    );
    dispatch(setIsAuthorized(true))
    dispatch(setDataIsLoaded(true));
    dispatch(setCoins(response.data.resources.coins));
    dispatch(setDiamonds(response.data.resources.diamonds));
    dispatch(setDescription(response.data.about_me));
    dispatch(setCoinsOnClick(response.data.coins_per_click));
    dispatch(setCoinsPerMinute(response.data.coins_per_minute));
    dispatch(setNickname(response.data.nickname || 'User'));
    dispatch(setId(response.data.id));
    data.closeAuthWindow();
  } catch (error: any) {
    dispatch(setDataIsLoaded(false));
    if (error.status === 401) {
      data.setError({ login: 'Неверный логин или пароль' });
    } else if (error.status === 500) {
      data.setError({ login: 'Ошибка на сервере' });
    }
    console.error('Error with authorization: ', error);
  } finally {
    data.setIsLoaded(false);
  }
};
