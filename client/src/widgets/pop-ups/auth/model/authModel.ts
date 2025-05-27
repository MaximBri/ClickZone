import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/app/store/store";
import { authorization } from "@/entities/user/authorization";
import { TEMP_USER_DATA } from "@/shared/config/apiRoutes";
import { authErrorInterface, userDataForRegister } from "@/shared/types";
import {
  getInProcess,
  setAuthWindow,
  setInProcess,
  setRegisterWindow,
} from "../../model/popUpsSlice";
import styles from "../../shared/Auth&Register.module.scss";

/**
 * Функция отвечает за всю логику авторизации: контроль полей ввода: логин, пароль, состояние загрузки, отправку запроса на бэкенд.
 */
export const authModel = () => {
  const dispatch = useAppDispatch();
  const temp = localStorage.getItem(TEMP_USER_DATA);
  let data: userDataForRegister;
  if (temp) {
    data = JSON.parse(temp);
  } else data = { login: "", password: "" };
  localStorage.removeItem(TEMP_USER_DATA);

  const [login, setLogin] = useState<string>(data.login);
  const [pass, setPass] = useState<string>("");
  const [canSend, setCanSend] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<authErrorInterface>({});
  const background = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLElement>(null);
  const inProcess = useSelector(getInProcess);

  /**
   * Функция для проверки логина и пароля на длину (должны быть не меньше 3-х символов)
   */
  const checkFields = () => {
    if (login.length > 3 && pass.length > 3) setCanSend(true);
    else setCanSend(false);
  };

  /**
   * Функция для закрытия всплывающего окна с авторизаций. Создаёт плавное закрытие, либо переход к окну регистрации
   */
  const closeAuthWindow = () => {
    background.current?.classList.add(styles["window__background--closed"]);
    body.current?.classList.add(styles["window--closed"]);
    setTimeout(() => {
      dispatch(setAuthWindow(false));
      dispatch(setInProcess(false));
    }, 250);
  };

  /**
   * Функция отвечает за открытие всплывающего окна регистрации и закрытия окна авторизации
   */
  const openRegisterWindow = () => {
    body.current?.classList.add(styles["window--closed"]);
    setTimeout(() => {
      dispatch(setInProcess(true));
      dispatch(setRegisterWindow(true));
      dispatch(setAuthWindow(false));
    }, 250);
  };

  /**
   * Функция для вызова функции авторизации. Ещё раз проверяет все отправляемые данные на необходимые условия, если что-то не так, показывает ошибку пользователю
   */
  const sendForm = () => {
    if (pass.length < 4) {
      setError({ pass: "Пароль не может быть короче 4 символов!" });
    } else if (login.length < 4) {
      setError({ login: "Логин не может быть короче 4 символов!" });
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
