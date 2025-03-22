import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";

export const useCheckUserAuth = async () => {
  try {
    const response = await api.get(apiRoutes.checkAuthorization);
    return response;
  } catch (error) {
    throw error;
  }
};
