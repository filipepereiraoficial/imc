/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** '1' quando a aplicacao e empacotada como pagina unica (ver scripts/pagina-unica.mjs). */
  readonly VITE_PAGINA_UNICA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
