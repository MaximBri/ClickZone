import { apiRoutes } from '@/shared/config/apiRoutes';
import Cookies from 'js-cookie';
import axios from 'axios';

export const refreshAccessToten = async () => {
  const token = Cookies.get('csrf_refresh_token');
  const response = await axios.post(
    apiRoutes.refreshTokens,
    {},
    {
      baseURL: '/api',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-TOKEN': token,
      },
    }
  );
  console.log(response);
};
