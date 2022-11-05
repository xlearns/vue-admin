import { watchEffect } from "vue";
import { type I18n, createI18n } from "vue-i18n";
import { useStorage } from "@vueuse/core";
// element-plus国际化
import enLocale from "element-plus/lib/locale/lang/en";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";

const state = useStorage("locale", {
  locale: "zh"
});

// 自定义国际化
function cumtosI18n(prefix = "zh-CN") {
  return Object.fromEntries(
    Object.entries(import.meta.globEager("../../../locales/*.json5")).map(
      ([key, value]) => {
        // key
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
        return [matched, value.default];
      }
    )
  )[prefix];
}

const localesConfigs = {
  zh: {
    ...cumtosI18n("zh-CN"),
    ...zhLocale
  },
  en: {
    ...cumtosI18n("en"),
    ...enLocale
  }
};

const i18n: I18n = createI18n({
  // legacy: false, // Composition API 模式
  locale: state.value?.locale ?? "zh",
  fallbackLocale: "en",
  messages: localesConfigs
});

watchEffect(() => {
  i18n.global.locale = state.value?.locale ?? "zh";
});
export const useI18Hook = () => {
  return {
    i18n
  };
};
