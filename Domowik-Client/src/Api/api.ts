import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7107/api',
});

export const getFamilies = async () => {
  const response = await api.get('/family');

  return response;
};
