import { API_URL, apiRoutes } from '@/shared/config/apiRoutes';
import { userDataForRegister } from '@/shared/types';

export const registration = async (userData: userDataForRegister) => {
  try {
    const response = await fetch(`${API_URL}${apiRoutes.registration}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error with registration: ', error);
  }
};
