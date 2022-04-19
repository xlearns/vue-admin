import WindiCSS from "vite-plugin-windicss";
import type { ConfigEnv } from "vite";
import { loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { wrapperEnv } from "./build/utils";
import alias from "./build/vite/alias";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  // const viteEnv = wrapperEnv(env);
  return {
    plugins: [vue(), vueJsx(), WindiCSS()],
    resolve: {
      alias
    },
    // 服务端渲染
    server: {
      https: false,
      host: "0.0.0.0"
    }
  };
};
