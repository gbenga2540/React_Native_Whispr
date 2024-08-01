import axios, { InternalAxiosRequestConfig } from 'axios';
import { loadString } from './storage';
import { strings } from './strings';
import { EnvConfig } from '../utils/get-env';

async function useAuthentication(config: InternalAxiosRequestConfig) {
  // set api url
  config.baseURL = EnvConfig.baseURL;
  // config.baseURL = 'http://10.0.2.2:5000/api/v1';
  const token = await loadString(strings.userToken);

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
}

const instance = axios.create({
  timeout: 30 * 1000,
});

instance.interceptors.request.use(useAuthentication);

export default instance;
