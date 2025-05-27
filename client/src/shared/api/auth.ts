import { apiRoutes } from "../config/apiRoutes";
import { api } from "./base";

/**
 * Глобальный объект с методами для авторизации, регистрации
 */
export const authApi = {
  /**
   * Метод для выхода игрока из аккаунта
   */
  logout: () => api.post(apiRoutes.logout),

  /**
   * Метод для отправки авторизации на бэкенд
   * @param {string} login - логин пользователя
   * @param {string} password - пароль пользователя
   */
  sendAuth: (login: string, password: string) => {
    const response = api.post(apiRoutes.authorization, {
      login,
      password,
    });
    return response;
  },

  /**
   * Метод для отправки запроса на регистрацию
   * @param {string} login - логин пользователя
   * @param {string} password - пароль пользователя
   */
  sendRegister: (login: string, password: string) => {
    const response = api.post(apiRoutes.registration, {
      login,
      password,
    });
    return response;
  },
};
