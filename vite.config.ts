import { fileURLToPath, URL } from "url";
import WindiCSS from "vite-plugin-windicss";
import type { ConfigEnv } from "vite";
import { loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { wrapperEnv } from "./build/utils";

// 设置别名
const alias = {
  "@": fileURLToPath(new URL("./src", import.meta.url)),
  "@c": fileURLToPath(new URL("./src/components", import.meta.url)),
  "@build": fileURLToPath(new URL("./build", import.meta.url))
};
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
