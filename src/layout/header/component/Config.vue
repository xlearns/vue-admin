<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import SettingSvg from "@/assets/system/setting.svg";
import { AppDarkModeToggle } from "@/components/application";
import NavModel from "./NavModel.vue";
import Colors from "./Colors.vue";
import { useTheme } from "@/hooks/useTheme";
import { useMenuSetting } from "@/hooks/useMenuSetting";
const { getNavColor } = useMenuSetting();
let { t } = useI18n();
let { navTheme } = useTheme();
let drawer = ref(false);

function danger() {
  localStorage.clear();
  location.reload();
}
</script>

<template>
  <div
    class="box"
    :style="{ color: navTheme == 1 ? getNavColor.text : '#000' }"
  >
    <SettingSvg class="w-[16px] h-[16px]" @click="drawer = !drawer" />
  </div>
  <el-drawer v-model="drawer" size="315px" :title="t('settings.title')">
    <el-divider content-position="center">{{ t("settings.theme") }}</el-divider>
    <AppDarkModeToggle class="flex justify-center" />
    <el-divider content-position="center">{{ t("settings.nav") }}</el-divider>
    <NavModel />
    <el-divider content-position="center">{{ t("settings.color") }}</el-divider>
    <Colors />
    <el-divider content-position="center">{{ t("settings.show") }}</el-divider>
    <el-divider />
    <el-button type="danger" class="w-full" @click="danger">
      {{ t("settings.logout") }}
    </el-button>
  </el-drawer>
</template>

<style scoped>
@import "./index.scss";
</style>
