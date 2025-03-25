import { useAppDispatch } from '@/app/store/store';
import { useRef, useState } from 'react';
import {
  getInProcess,
  setAuthWindow,
  setInProcess,
  setRegisterWindow,
} from '../../model/popUpsSlice';
import { registration } from '@/entities/user/registration';
import styles from '../../shared/Auth&Register.module.scss';
import { useSelector } from 'react-redux';

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
  const background = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLElement>(null);
  const inProcess = useSelector(getInProcess);

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
    body.current?.classList.add(styles['window--closed']);
    setTimeout(() => {
      dispatch(setInProcess(true));
      dispatch(setRegisterWindow(false));
      dispatch(setAuthWindow(true));
    }, 250);
  };

  const closeRegisterWindow = () => {
    background.current?.classList.add(styles['window__background--closed']);
    body.current?.classList.add(styles['window--closed']);
    setTimeout(() => {
      dispatch(setRegisterWindow(false));
      dispatch(setInProcess(false));
    }, 250);
  };

  const sendForm = () => {
    const check = checkCanSend();
    if (check) {
      setLoading(true);
      registration(
        {
          login: formData.login,
          password: formData.pass,
        },
        setError,
        openAuthWindow
      ).then(() => {
        setLoading(false);
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
    loading,
    openAuthWindow,
    inProcess,
    refs: {
      body,
      background,
    },
  };
};
