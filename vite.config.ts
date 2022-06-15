import type { ConfigEnv } from "vite";
import { loadEnv } from "vite";
import { createProxy, wrapperEnv } from "./build/utils";
import alias from "./build/vite/alias";
import { getPluginsList } from "./build/vite/plugin/index";
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;
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
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    optimizeDeps: {
      exclude: ["@zougt/vite-plugin-theme-preprocessor/dist/browser-utils"]
    }
  };
};
