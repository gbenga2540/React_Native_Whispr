import { useQuery } from 'react-query';
import { getUser } from './api';
import { GetUserRequest } from './types';

export function useGetUser(payload: GetUserRequest) {
  return useQuery('getUser', () => getUser(payload));
}
