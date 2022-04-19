// declare global {
// }

type Recordable<T = any> = Record<string, T>;
declare interface ViteEnv {
  VITE_PORT: number;
  VITE_PUBLIC_PATH: string;
  VITE_PROXY_DOMAIN: string;
  VITE_PROXY_DOMAIN_REAL: string;
  VITE_ROUTER_HISTORY: string;
  VITE_LEGACY: boolean;
}
