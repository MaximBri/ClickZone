import Cookies from 'js-cookie';
import axios from 'axios';

export const CSRF_TOKEN = 'csrf_access_token';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const csrfToken = Cookies.get(CSRF_TOKEN);

  if (
    ['post', 'put', 'patch', 'delete'].includes(
      config.method?.toLowerCase() ?? ''
    )
  ) {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }

  return config;
});
