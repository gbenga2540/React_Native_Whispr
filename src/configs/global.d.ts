interface User {
  id: string;
}

interface ServerResponse<T> {
  status: number;
  msg?: string;
  data?: T;
}

declare namespace NodeJS {
  interface ProcessEnv {
    API_BASE_URL: string;
  }
}
