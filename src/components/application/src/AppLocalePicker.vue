<script setup lang="ts">
import language from "@/assets/svg/language.svg";
import { useStorage } from "@vueuse/core";
import { useI18n } from "vue-i18n";
let { locale } = useI18n();
const state = useStorage("locale", {
  locale: "zh"
});
function changeLocale(val: string) {
  locale.value = val;
  state.value = { locale: val };
}
</script>

<template>
  <div class="flex items-center">
    <el-dropdown trigger="click">
      <div class="w-[16px] h-[16px] cursor-pointer">
        <language />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="changeLocale('zh')"
            >简体中文</el-dropdown-item
          >
          <el-dropdown-item @click="changeLocale('en')"
            >English</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped></style>
