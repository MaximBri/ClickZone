import { apiRoutes } from '../config/apiRoutes';
import { api } from './base';

export const authApi = {
  // getUserInfo: () => api.get<UserInfo>('/auth/user-info'),
  // logout: () => api.post('/auth/logout'),

  sendAuth: (login: string, password: string) => {
    const response = api.post(apiRoutes.authorization, { login, password });
    return response;
  },

  sendRegister: (login: string, password: string) => {
    const response = api.post(apiRoutes.registration, { login, password });
    return response;
  },

  // verifyEmail: (email: string, code: string) =>
  //   api.post<EmailAuthResponse>('/auth/email/verify', {
  //     email,
  //     code,
  //   }),
};
