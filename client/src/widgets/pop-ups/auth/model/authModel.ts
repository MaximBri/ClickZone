import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/app/store/store';
import { authorization } from '@/entities/user/authorization';
import { TEMP_USER_DATA } from '@/shared/config/apiRoutes';
import { authErrorInterface, userDataForRegister } from '@/shared/types';
import {
  getInProcess,
  setAuthWindow,
  setInProcess,
  setRegisterWindow,
} from '../../model/popUpsSlice';
import styles from '../../shared/Auth&Register.module.scss';

export const authModel = () => {
  const dispatch = useAppDispatch();
  const temp = localStorage.getItem(TEMP_USER_DATA);
  let data: userDataForRegister;
  if (temp) {
    data = JSON.parse(temp);
  } else data = { login: '', password: '' };
  localStorage.removeItem(TEMP_USER_DATA);

  const [login, setLogin] = useState<string>(data.login);
  const [pass, setPass] = useState<string>('');
  const [canSend, setCanSend] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<authErrorInterface>({});
  const background = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLElement>(null);
  const inProcess = useSelector(getInProcess);

  const checkFields = () => {
    if (login.length > 3 && pass.length > 3) setCanSend(true);
    else setCanSend(false);
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
      authorization({
        login,
        password: pass,
        appDispatch: dispatch,
        closeAuthWindow,
        setError,
        setIsLoaded,
      });
    }
  };

  useEffect(() => {
    checkFields();
  }, [pass, login]);

  return {
    closeAuthWindow,
    sendForm,
    canSend,
    error,
    openRegisterWindow,
    inProcess,
    isLoaded,
    refs: {
      body,
      background,
    },
    form: {
      login,
      pass,
      setPass,
      setLogin,
    },
  };
};
