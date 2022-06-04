import { resolve } from "path";
import { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import WindiCSS from "vite-plugin-windicss";
import ElementPlus from "unplugin-element-plus/vite";
import svgLoader from "vite-svg-loader";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import configHtmlPlugin from "./html";
// import themePlugs from "./theme";
import DefineOptions from "unplugin-vue-define-options/vite";

export function getPluginsList(viteEnv, VITE_LEGACY) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    // 必须安装vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve("locales/**")]
    }),
    vueJsx(),
    WindiCSS(),
    DefineOptions(),
    ElementPlus({ useSource: true }),
    svgLoader()
    // themePlugs()
  ];
  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, VITE_LEGACY));
  return vitePlugins;
}
