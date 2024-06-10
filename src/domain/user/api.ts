import instance from 'src/configs/axios';
import { GetUserRequest, GetUserResponse } from './types';

export async function getUser(
  payload: GetUserRequest,
): Promise<GetUserResponse> {
  const response = await instance.get(`/user/${payload.user_id}`);
  return response.data;
}
