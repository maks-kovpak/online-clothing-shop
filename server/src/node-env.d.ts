declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      CLIENT_URL: string;
      MONGO_URI: string;
      JWT_TOKEN_SECRET: string;
      COOKIE_SECRET: string;
    }
  }
}

export {};
