import axios from 'axios';
import { API_URL } from './config';

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    return;
  }

  try {
    const response = await axios.post(`${API_URL}/api/v1/token/refresh/`, {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;
    localStorage.setItem('access_token', newAccessToken);
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
};
