interface User {
  token?: string;
  user?: {
    email?: string;
    user_id?: string;
    user_name?: string;
    full_name?: string;
    phone_number?: string;
    bio?: string;
    joined?: string;
    profile_picture?: string;
  };
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
