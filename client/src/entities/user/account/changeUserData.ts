import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";

export const changeUserData = async (name: string, description: string) => {
  try {
    const response = await api.post(apiRoutes.editProfile, {
      name: name,
      about_me: description,
    });
    console.log(response);
  } catch (error: any) {
    console.error(error);
  }
};
