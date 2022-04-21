declare global {
  type Recordable<T = any> = Record<string, T>;
  type Fn = (...arg: any) => any;
  interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY_DOMAIN: string;
    VITE_PROXY_DOMAIN_REAL: string;
    VITE_ROUTER_HISTORY: string;
    VITE_LEGACY: boolean;
    VITE_GLOB_APP_TITLE: string;
  }
}

export {};
