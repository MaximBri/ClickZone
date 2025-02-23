import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/app/store/store';
import { authorization } from '@/entities/user/authorization';
import {
  getInProcess,
  setAuthWindow,
  setInProcess,
  setRegisterWindow,
} from '../../model/popUpsSlice';
import styles from '../../shared/Auth&Register.module.scss';

export const authModel = () => {
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [canSend, setCanSend] = useState<boolean>(false);
  const [error, setError] = useState<{ login?: string; pass?: string }>({});
  const background = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLElement>(null);
  const inProcess = useSelector(getInProcess);

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
    background.current?.classList.add(styles['window__background--closed']);
    body.current?.classList.add(styles['window--closed']);
    setTimeout(() => {
      dispatch(setAuthWindow(false));
      dispatch(setInProcess(false));
    }, 250);
  };

  const openRegisterWindow = () => {
    body.current?.classList.add(styles['window--closed']);
    setTimeout(() => {
      dispatch(setInProcess(true));
      dispatch(setRegisterWindow(true));
      dispatch(setAuthWindow(false));
    }, 250);
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
    inProcess,
    refs: {
      body,
      background,
    },
    form: {
      login,
      pass,
      updatePass,
      updateLogin,
    },
  };
};
