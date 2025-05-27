import { useAppDispatch } from "@/app/store/store";
import { useRef, useState } from "react";
import {
  getInProcess,
  setAuthWindow,
  setInProcess,
  setRegisterWindow,
} from "../../model/popUpsSlice";
import { registration } from "@/entities/user/registration";
import styles from "../../shared/Auth&Register.module.scss";
import { useSelector } from "react-redux";

export interface formDataSendInterface extends Partial<formDataInterface> {
  item?: "login" | "pass" | "repeatPass" | "";
}

export interface formDataInterface {
  login: string;
  pass: string;
  repeatPass: string;
}

/**
 * Функция отвечает за всю логику для окна регистрации. Включает в себя функции для проверки, можно ли отправить данные на бэкенд (проверка ограничений), функцию для отправки данных на бэкенд, функции для открытия окна авторизации и закрытия окна регистрации.
 */
export const registerModel = () => {
  const dispatch = useAppDispatch();
  const [canSend, setCanSend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<formDataSendInterface>({});
  const [formData, setFormData] = useState<formDataInterface>({
    login: "",
    pass: "",
    repeatPass: "",
  });
  const background = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLElement>(null);
  const inProcess = useSelector(getInProcess);

  /**
   * Функция отвечает за проверку всех данных пользователя, которые он ввёл в форме. Включает в себя проверку на длину никнейма (длина от 4-х символов), пароля (длина от 4-х символов), совпадение полей "Пароль" и "Повторите пароль". Если что-то не выполняется, возвращает false, иначе true
   * @return {boolean}  result - булевое значение, отвечает за то, можно ли отправить данные на бэкенд
   */
  const checkCanSend = (): boolean => {
    let check: boolean = false;
    if (formData.login.length < 4) {
      setError({
        item: "login",
        login: "Логин не может быть короче 4 символов",
      });
      setCanSend(check);
    } else if (formData.pass.length < 4) {
      setError({
        item: "pass",
        pass: "Пароль не может быть короче 4 символов",
      });
      setCanSend(check);
    } else if (formData.pass !== formData.repeatPass) {
      setError({ item: "repeatPass", repeatPass: "Пароли не совпадают" });
      setCanSend(check);
    } else {
      check = true;
      setError({});
      setCanSend(check);
    }
    return check;
  };

  /**
   * Функция отвечает за синхронизацию данных пользователя в форме и в компоненте
   * @param key - ключ, отвечающий за название поля, которое будет обновлено
   * @param value - новое значение, которое будет установлено в объект с данными пользователя
   */
  const onChangeData = (
    key: "login" | "pass" | "repeatPass" | "",
    value: string
  ) => {
    setFormData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  /**
   * Функция отвечает за открытие окна авторизации и закрытия окна регистрации. Дополнительно выполняется код, отвечающий за плавность переключения
   */
  const openAuthWindow = () => {
    body.current?.classList.add(styles["window--closed"]);
    setTimeout(() => {
      dispatch(setInProcess(true));
      dispatch(setRegisterWindow(false));
      dispatch(setAuthWindow(true));
    }, 250);
  };

  /**
   * Функция отвечает за закрытия окна регистрации, дополнительно выполняется код для плавности выключения
   */
  const closeRegisterWindow = () => {
    background.current?.classList.add(styles["window__background--closed"]);
    body.current?.classList.add(styles["window--closed"]);
    setTimeout(() => {
      dispatch(setRegisterWindow(false));
      dispatch(setInProcess(false));
    }, 250);
  };

  /**
   * Функция отвечает за отправку данных. В начале проверяет, можно ли отправить их (выполнены ли все условия). Если да, то отправляет данные на бэкенд
   */
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
