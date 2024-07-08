import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '@env';

const getEnv = <T>(name: any): T => {
  const value = name;
  if (value === undefined || value === null) {
    throw new Error(`Environment variable ${name} is required!`);
  }
  return value as unknown as T;
};

export const EnvConfig = {
  baseURL: __DEV__
    ? getEnv<string>(API_BASE_URL_DEV)
    : getEnv<string>(API_BASE_URL_PROD),
};
