import api from '../index';
import { Invitation } from './types';

export const getOrCreateInvitation = async () => {
  const response = await api.post<{ token: string }>('/invitations');

  return response.data;
};

export const getInvitation = async (token: string) => {
  const response = await api.get<Invitation>(`/invitations?token=${token}`);

  return response.data;
};

export const useInvitation = async (token: string) => {
  const response = await api.post(`invitations/use?token=${token}`);

  return response.data;
};
