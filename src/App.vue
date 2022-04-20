<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import { useStorage } from "@vueuse/core";
import { computed } from "vue";
interface locale {
  locale: string;
}
const state = useStorage("locale", {
  locale: "zh"
});

const currentLocale = computed(() => {
  return state.value.locale === "zh" ? zhCn : en;
});
</script>

<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
