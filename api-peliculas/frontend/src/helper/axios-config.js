import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api-peliculas-backend-389k.onrender.com'
});
