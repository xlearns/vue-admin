<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import SettingSvg from "@/assets/system/setting.svg";
import { AppDarkModeToggle } from "@/components/application";
import NavModel from "./NavModel.vue";
let { t } = useI18n();
let drawer = ref(false);

function danger() {
  localStorage.clear();
  location.reload();
}
</script>

<template>
  <div class="w-1em h-1em cursor-pointer">
    <SettingSvg @click="drawer = !drawer" />
  </div>
  <el-drawer v-model="drawer" size="315px" :title="t('settings.title')">
    <el-divider content-position="center">{{ t("settings.theme") }}</el-divider>
    <AppDarkModeToggle class="flex justify-center" />
    <el-divider content-position="center">{{ t("settings.nav") }}</el-divider>
    <NavModel />
    <el-divider />
    <el-button type="danger" class="w-full" @click="danger">
      {{ t("settings.logout") }}
    </el-button>
  </el-drawer>
</template>

<style scoped></style>
