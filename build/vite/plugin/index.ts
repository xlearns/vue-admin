import { resolve } from "path";
import { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import WindiCSS from "vite-plugin-windicss";
// element plus按需引入会导致 vite启动巨慢
// import ElementPlus from "unplugin-element-plus/vite";
import svgLoader from "vite-svg-loader";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import configHtmlPlugin from "./html";
import themePlugs from "./theme";
import DefineOptions from "unplugin-vue-define-options/vite";
import auto from "./auto";

export function getPluginsList(viteEnv, isbuild) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    // ElementPlus({ useSource: true }),
    // 必须安装vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve("locales/**")]
    }),
    auto(),
    vueJsx(),
    WindiCSS(),
    DefineOptions(),
    svgLoader(),
    themePlugs()
  ];
  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isbuild));
  return vitePlugins;
}
