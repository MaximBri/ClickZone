import { useAppDispatch } from '@/app/store/store';
import {
  setAuthWindow,
  setInProcess,
  setRegisterWindow,
} from '../../model/popUpsSlice';
import { useState } from 'react';
import { authorization } from '@/entities/user/authorization';

export const authModel = () => {
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [canSend, setCanSend] = useState<boolean>(false);
  const [error, setError] = useState<{ login?: string; pass?: string }>({});

  const checkFields = (text1: string, text2: string) => {
    if (text1.length > 3 && text2.length > 3) setCanSend(true);
    else setCanSend(false);
  };

  const updatePass = (text: string) => {
    setPass(text);
    checkFields(text, login);
  };

  const updateLogin = (text: string) => {
    setLogin(text);
    checkFields(text, pass);
  };

  const closeAuthWindow = () => {
    dispatch(setAuthWindow(false));
  };

  const openRegisterWindow = () => {
    dispatch(setRegisterWindow(true));
    dispatch(setInProcess(true));
    dispatch(setAuthWindow(false));
  };

  const sendForm = () => {
    if (pass.length < 4) {
      setError({ pass: 'Пароль не может быть короче 4 символов!' });
    } else if (login.length < 4) {
      setError({ login: 'Логин не может быть короче 4 символов!' });
    } else {
      setError({});
      authorization({ login, password: pass });
    }
  };

  return {
    closeAuthWindow,
    sendForm,
    canSend,
    error,
    openRegisterWindow,
    form: {
      login,
      pass,
      updatePass,
      updateLogin,
    },
  };
};
