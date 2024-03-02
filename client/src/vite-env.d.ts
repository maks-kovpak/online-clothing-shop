/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEBUG: 'true' | 'false';
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
