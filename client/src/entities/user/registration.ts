import { TEMP_USER_DATA } from "@/shared/config/apiRoutes";
import { userDataForRegister } from "@/shared/types";
import { formDataSendInterface } from "@/widgets/pop-ups/register/model/registerModel";
import { authApi } from "@/shared/api/auth";

export interface dataAfterRegisterInterface {
  id: number;
  nickname: string;
}

/**
 * Функция регистрации на основе логина, пароля.
 * @param {userDataForRegister} userData - объект с логином и паролем
 * @param {React.Dispatch<React.SetStateAction<formDataSendInterface>>} setError - функция для установки какой-либо ошибки, показывается покажется пользователю
 * @param {() => void} closeRegisterWindow - функция для закрытия окна регистрации
 */
export const registration = async (
  userData: userDataForRegister,
  setError: React.Dispatch<React.SetStateAction<formDataSendInterface>>,
  closeRegisterWindow: () => void
) => {
  try {
    await authApi.sendRegister(userData.login, userData.password);
    localStorage.setItem(
      TEMP_USER_DATA,
      JSON.stringify({ login: userData.login })
    );
    closeRegisterWindow();
  } catch (error: any) {
    console.error("Error with registration: ", error);
    if (error.status === 422) {
      setError({
        item: "login",
        login: "Данный логин занят другим пользователем",
      });
    } else if (error.status === 400) {
      setError({
        item: error.response.data.error.field || "login",
        [error.response.data.error.field || "login"]:
          error.response.data.error.message,
      });
    } else if (error.status === 500) {
      setError({
        item: "login",
        login: "Ошибка на сервере",
      });
    }
  }
};
