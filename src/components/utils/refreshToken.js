import axios from 'axios';

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    // Если нет refreshToken, то нечего обновлять
    return;
  }

  try {
    const response = await axios.post('http://139.59.132.105/api/v1/token/refresh/', {
      refresh: refreshToken,
    });

    // Обработайте успешный ответ и сохраните новый access_token
    const newAccessToken = response.data.access;
    localStorage.setItem('access_token', newAccessToken);
    console.log('Access token refreshed successfully:', newAccessToken);
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
};

// Вызовите функцию для обновления токена, например, при каждом запросе к API
