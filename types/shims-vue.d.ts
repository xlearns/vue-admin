declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@zougt/vite-plugin-theme-preprocessor/*" {
  export const themePreprocessorPlugin: import("@zougt/vite-plugin-theme-preprocessor/dist/types").Options;
  module "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils" {
    export interface IOptions {
      scopeName: string;
      // 可选，link的href处理，看情况用， 当启用themePreprocessorPlugin的extract后才需要
      customLinkHref?: (href: string) => string;
      // 可选，默认对应 themePreprocessorPlugin的themeLinkTagId
      themeLinkTagId?: string;
      // 可选 "head" || "body"
      themeLinkTagInjectTo?: "head" | "body";
      // 可选，对应 themePreprocessorPlugin的multipleScopeVars
      multipleScopeVars?: Object[];
    }
    export function toggleTheme(opt: IOptions): void;
  }
}
