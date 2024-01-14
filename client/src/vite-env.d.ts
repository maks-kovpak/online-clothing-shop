/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEBUG: 'true' | 'false';
  readonly VITE_URL_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
