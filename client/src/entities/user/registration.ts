import { API_URL, apiRoutes } from '@/shared/config/apiRoutes';
import { userDataForRegister } from '@/shared/types';
import axios from 'axios';

export const registration = async (userData: userDataForRegister) => {
  console.log(userData)
  try {
    const response = await axios.post(
      `${API_URL}${apiRoutes.registration}`,
      userData,
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
