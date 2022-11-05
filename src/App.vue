<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import { useStorage } from "@vueuse/core";

const state = useStorage("locale", {
  locale: "zh"
});

const currentLocale = computed(() => {
  return state.value.locale === "zh" ? zhCn : en;
});
</script>

<template>
  <el-config-provider :locale="currentLocale">
    <router-view> </router-view>
  </el-config-provider>
</template>
