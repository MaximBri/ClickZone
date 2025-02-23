import axios from 'axios';

import { AppDispatch, useAppDispatch } from '@/app/store/store';
import { setDataAfterRegister, setDataIsLoaded } from './model/userSlice';
import { API_URL, apiRoutes } from '@/shared/config/apiRoutes';
import { userDataForRegister } from '@/shared/types';
import { formDataSendInterface } from '@/widgets/pop-ups/register/model/registerModel';

export interface dataAfterRegisterInterface {
  id: number;
  nickname: string;
}

export const registration = async (
  userData: userDataForRegister,
  setError: React.Dispatch<React.SetStateAction<formDataSendInterface>>,
  closeRegisterWindow: () => void,
  dispatch: AppDispatch
) => {
  try {
    const response = await axios.post(
      `${API_URL}${apiRoutes.registration}`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response);
    dispatch(setDataIsLoaded(true));
    dispatch(
      setDataAfterRegister({
        id: response.data.user.user_id,
        nickname: response.data.user.username,
      })
    );
    closeRegisterWindow()
  } catch (error: any) {
    console.error('Error with registration: ', error);
    if (error.response.status === 422) {
      setError({
        item: 'login',
        login: 'Данный логин занят другим пользователем',
      });
    } else if (error.response.status === 400) {
      setError({
        item: error.response.data.error.field || 'login',
        [error.response.data.error.field || 'login']:
          error.response.data.error.message,
      });
    } else if (error.response.status === 500) {
      setError({
        item: 'login',
        login: 'Ошибка на сервере',
      });
    }
  }
};
