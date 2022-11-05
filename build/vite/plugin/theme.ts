import path from "path";
import { themePreprocessorPlugin } from "@zougt/vite-plugin-theme-preprocessor";

export default function () {
  const themePlugin = themePreprocessorPlugin({
    scss: {
      arbitraryMode: false,
      multipleScopeVars: [
        {
          scopeName: "theme-default",
          path: path.resolve("src/style/theme/default.scss")
        },
        {
          scopeName: "theme-blue",
          path: path.resolve("src/style/theme/default.scss")
        },
        {
          scopeName: "theme-skyblue",
          path: path.resolve("src/style/theme/skyblue.scss")
        },
        {
          scopeName: "theme-dark",
          path: path.resolve("src/style/theme/dark.scss")
        },
        {
          scopeName: "theme-green",
          path: path.resolve("src/style/theme/green.scss")
        },
        {
          scopeName: "theme-orange",
          path: path.resolve("src/style/theme/orange.scss")
        },
        {
          scopeName: "theme-pink",
          path: path.resolve("src/style/theme/pink.scss")
        },
        {
          scopeName: "theme-purple",
          path: path.resolve("src/style/theme/purple.scss")
        },
        {
          scopeName: "theme-red",
          path: path.resolve("src/style/theme/red.scss")
        },
        {
          scopeName: "theme-yellow",
          path: path.resolve("src/style/theme/yellow.scss")
        },
        {
          scopeName: "theme-while",
          path: path.resolve("src/style/theme/while.scss")
        }
      ],
      defaultScopeName: "",
      // 在生产模式是否抽取独立的主题css文件，extract为true以下属性有效
      extract: false,
      // 独立主题css文件的输出路径，默认取 viteConfig.build.assetsDir 相对于 (viteConfig.build.outDir)
      outputDir: "",
      // 会选取defaultScopeName对应的主题css文件在html添加link
      themeLinkTagId: "head",
      // "head"||"head-prepend" || "body" ||"body-prepend"
      themeLinkTagInjectTo: "head",
      // 是否对抽取的css文件内对应scopeName的权重类名移除
      removeCssScopeName: false,
      // 可以自定义css文件名称的函数
      customThemeCssFileName: scopeName => scopeName
    }
  });
  return themePlugin;
}
