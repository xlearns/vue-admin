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
  <div class="cursor-pointer flex items-center px-2 h-full">
    <el-dropdown trigger="click">
      <div class="cursor-pointer">
        <language class="w-[16px] h-[16px]" />
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
