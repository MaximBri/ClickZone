import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";

export const changeUserData = async (
  name: string,
  description: string,
  nickname_price: { coins: number; diamonds: number }
) => {
  return await api.post(apiRoutes.editProfile, {
    name: name,
    about_me: description,
    nickname_price,
  });
};
