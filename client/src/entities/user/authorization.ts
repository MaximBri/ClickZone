import { authErrorInterface } from "@/shared/types";
import { notificationManager } from "@/widgets/pop-ups/notifications/model/notificationManager";
import { AppDispatch } from "@/app/store/store";
import { loginUser } from "./model/thunks";

export const authorization = async (data: {
  login: string;
  password: string;
  appDispatch: AppDispatch;
  closeAuthWindow: () => void;
  setError: React.Dispatch<React.SetStateAction<authErrorInterface>>;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = data.appDispatch;
  try {
    data.setIsLoaded(true);
    dispatch(loginUser({ ...data }));
    notificationManager(dispatch, "Успешный вход в аккаунт", "success");
    data.closeAuthWindow();
  } catch (error: any) {
    if (error.status === 401) {
      data.setError({ login: "Неверный логин или пароль" });
    } else if (error.status === 500) {
      data.setError({ login: "Ошибка на сервере" });
    }
    console.error("Error with authorization: ", error);
  } finally {
    data.setIsLoaded(false);
  }
};
