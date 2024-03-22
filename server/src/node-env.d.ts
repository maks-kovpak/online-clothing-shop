declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      CLIENT_URL: string;
      ALLOWED_HOSTS?: string;
      MONGO_URI: string;
      JWT_TOKEN_SECRET: string;
      COOKIE_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }
}

export {};
