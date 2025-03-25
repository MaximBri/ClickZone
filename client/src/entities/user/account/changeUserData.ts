import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";

export const changeUserData = async (name: string, description: string) => {
  return await api.post(apiRoutes.editProfile, {
    name: name,
    about_me: description,
  });
};
