import { apiRoutes } from '../config/apiRoutes';
import { api } from './base';

export const authApi = {
  logout: () => api.post(apiRoutes.logout),

  sendAuth: (
    login: string,
    password: string,
  ) => {
    const response = api.post(apiRoutes.authorization, {
      login,
      password,
    });
    return response;
  },

  sendRegister: (login: string, password: string) => {
    const response = api.post(apiRoutes.registration, {
      login,
      password,
    });
    return response;
  },
};
