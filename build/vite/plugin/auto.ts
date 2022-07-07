import AutoImport from "unplugin-auto-import/vite";

export default function () {
  const autoImportPlugin = AutoImport({
    // 这里除了引入 vue 以外还可以引入pinia、vue-router、vueuse等，
    // 甚至你还可以使用自定义的配置规则，见 https://github.com/antfu/unplugin-auto-import#configuration
    imports: ["vue", "vue-router", "vue-i18n"],
    dts: "./auto-imports.d.ts"
    // 第三方组件库的解析器
    // resolvers: [ElementPlusResolver()]
  });
  return autoImportPlugin;
}
