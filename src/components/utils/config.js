export const DOMAIN = 'sj.kg';
export const DEBUG_MODE = window.location.hostname === 'localhost';
export const API_URL = DEBUG_MODE ? 'http://139.59.132.105' : `https://${DOMAIN}`;
