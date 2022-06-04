import path from "path";
import { themePreprocessorPlugin } from "@zougt/vite-plugin-theme-preprocessor";

export default function () {
  const themePlugin = themePreprocessorPlugin({
    scss: {
      arbitraryMode: false,
      multipleScopeVars: [
        {
          scopeName: `theme-blue`,
          path: path.resolve(`src/style/theme/blue.scss`)
        },
        {
          scopeName: `theme-dark`,
          path: path.resolve(`src/style/theme/dark.scss`)
        },
        {
          scopeName: `theme-default`,
          path: path.resolve(`src/style/theme/default.scss`)
        },
        {
          scopeName: `theme-green`,
          path: path.resolve(`src/style/theme/green.scss`)
        },
        {
          scopeName: `theme-orange`,
          path: path.resolve(`src/style/theme/orange.scss`)
        },
        {
          scopeName: `theme-pink`,
          path: path.resolve(`src/style/theme/pink.scss`)
        },
        {
          scopeName: `theme-purple`,
          path: path.resolve(`src/style/theme/purple.scss`)
        },
        {
          scopeName: `theme-red`,
          path: path.resolve(`src/style/theme/red.scss`)
        },
        {
          scopeName: `theme-yellow`,
          path: path.resolve(`src/style/theme/yellow.scss`)
        },
        {
          scopeName: `theme-while`,
          path: path.resolve(`src/style/theme/while.scss`)
        }
      ],
      includeStyleWithColors: [
        {
          color: "#ffffff"
        }
      ]
    }
  });
  return themePlugin;
}
