<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useTheme } from "@/hooks/useTheme";
import { useMenuSetting } from "@/hooks/useMenuSetting";
import { useFullscreen } from "@vueuse/core";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { getNavColor } = useMenuSetting();
let { navTheme } = useTheme();
const { toggle } = useFullscreen();
</script>

<template>
  <el-tooltip
    class="box-item"
    effect="dark"
    :content="t('settings.fullScreen')"
    placement="bottom"
  >
    <div
      class="box"
      @click="toggle"
      :style="{ color: navTheme == 1 ? getNavColor.text : '#000' }"
    >
      <Icon class="w-[16px] h-[16px]" icon="ep:full-screen" />
    </div>
  </el-tooltip>
</template>

<style scoped>
@import "./index.scss";
</style>
