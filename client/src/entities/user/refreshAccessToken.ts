import { apiRoutes } from "@/shared/config/apiRoutes";
import Cookies from "js-cookie";
import axios from "axios";

/**
 * Функция для обновления JWT-access токена (нужен для входа пользователя в аккаунт).
 *
 * @return {*} - возвращает данные с бэкенда
 */
export const refreshAccessToten = async () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const token = Cookies.get("csrf_refresh_token");
  try {
    const response = await axios.post(
      apiRoutes.refreshTokens,
      {},
      {
        baseURL: import.meta.env.MODE === "production" ? baseURL : "/api",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-TOKEN": token,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to refresh token");
  }
};
