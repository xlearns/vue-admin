import type { ConfigEnv } from "vite";
import { loadEnv } from "vite";
import { wrapperEnv } from "./build/utils";
import alias from "./build/vite/alias";
import { getPluginsList } from "./build/vite/plugin/index";
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const {
    VITE_PORT,
    VITE_LEGACY,
    VITE_PUBLIC_PATH,
    VITE_PROXY_DOMAIN,
    VITE_PROXY_DOMAIN_REAL
  } = viteEnv;
  const isBuild = command === "build";
  return {
    plugins: getPluginsList(viteEnv, isBuild),
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias
    },
    // 服务端渲染
    server: {
      https: false,
      host: "0.0.0.0",
      port: VITE_PORT
    }
  };
};
