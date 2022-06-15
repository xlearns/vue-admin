declare global {
  type Recordable<T = any> = Record<string, T>;
  type Fn = (...arg: any) => any;
  interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_ROUTER_HISTORY: string;
    VITE_GLOB_APP_TITLE: string;
    VITE_PROXY: any[];
  }
}

export {};
