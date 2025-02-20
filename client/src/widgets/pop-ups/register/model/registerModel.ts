import { useAppDispatch } from '@/app/store/store';
import { useState } from 'react';
import {
  setAuthWindow,
  setInProcess,
  setRegisterWindow,
} from '../../model/popUpsSlice';
import { registration } from '@/entities/user/registration';

export interface formDataSendInterface extends Partial<formDataInterface> {
  item?: 'login' | 'pass' | 'repeatPass' | '';
}

export interface formDataInterface {
  login: string;
  pass: string;
  repeatPass: string;
}

export const registerModel = () => {
  const dispatch = useAppDispatch();
  const [canSend, setCanSend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<formDataSendInterface>({});
  const [formData, setFormData] = useState<formDataInterface>({
    login: '',
    pass: '',
    repeatPass: '',
  });

  const checkCanSend = (): boolean => {
    let check: boolean = false;
    if (formData.login.length < 4) {
      setError({
        item: 'login',
        login: 'Логин не может быть короче 4 символов',
      });
      setCanSend(check);
    } else if (formData.pass.length < 4) {
      setError({
        item: 'pass',
        pass: 'Пароль не может быть короче 4 символов',
      });
      setCanSend(check);
    } else if (formData.pass !== formData.repeatPass) {
      setError({ item: 'repeatPass', repeatPass: 'Пароли не совпадают' });
      setCanSend(check);
    } else {
      check = true;
      setError({});
      setCanSend(check);
    }
    return check;
  };

  const onChangeData = (
    key: 'login' | 'pass' | 'repeatPass' | '',
    value: string
  ) => {
    setFormData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const openAuthWindow = () => {
    closeRegisterWindow();
    dispatch(setAuthWindow(true));
  };

  const closeRegisterWindow = () => {
    dispatch(setRegisterWindow(false));
    dispatch(setInProcess(false));
  };

  const sendForm =  () => {
    const check = checkCanSend();
    if (check) {
      setLoading(true);
      registration({
        login: formData.login,
        password: formData.pass,
      }).then(() => {
        setLoading(false);
      }
      )
    }
  };

  return {
    closeRegisterWindow,
    formData,
    canSend,
    onChangeData,
    sendForm,
    error,
    loading,
    openAuthWindow,
  };
};
