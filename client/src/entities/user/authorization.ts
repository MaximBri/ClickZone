import { API_URL, apiRoutes } from '@/shared/config/apiRoutes';
import axios from 'axios';

export const authorization = async (data: {
  login: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${API_URL}${apiRoutes.authorization}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.error('Error with registration: ', error);
  }
};
