import { useAppDispatch } from '@/app/store/store';
import { useState } from 'react';
import {
  setAuthWindow,
  setInProcess,
  setRegisterWindow,
} from '../../model/popUpsSlice';
import { registration } from '@/entities/user/registration';

export interface formDataSendInterface extends Partial<formDataInterface> {
  item?: 'email' | 'login' | 'pass' | 'repeatPass' | '';
}

export interface formDataInterface {
  email: string;
  login: string;
  pass: string;
  repeatPass: string;
}

export const registerModel = () => {
  const dispatch = useAppDispatch();
  const [canSend, setCanSend] = useState<boolean>(false);
  const [error, setError] = useState<formDataSendInterface>({});
  const [formData, setFormData] = useState<formDataInterface>({
    email: '',
    login: '',
    pass: '',
    repeatPass: '',
  });

  const checkCanSend = (): boolean => {
    let check: boolean = false;
    if (!formData.email.length) {
      setError({ item: 'email', email: 'Введите коррекнтую почту' });
      setCanSend(check);
    } else if (formData.login.length < 4) {
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
    key: 'email' | 'login' | 'pass' | 'repeatPass' | '',
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

  const sendForm = () => {
    const check = checkCanSend();
    console.log({
      email: formData.email,
      login: formData.login,
      password: formData.pass,
    });
    if (check) {
      registration({
        email: formData.email,
        password: formData.pass,
        login: formData.login,
      });
    }
  };

  return {
    closeRegisterWindow,
    formData,
    canSend,
    onChangeData,
    sendForm,
    error,
    openAuthWindow,
  };
};
