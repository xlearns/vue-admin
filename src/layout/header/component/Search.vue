<script setup lang="ts">
import { ref } from "vue";
import { useMenuSetting } from "@/hooks/useMenuSetting";
import { useTheme } from "@/hooks/useTheme";
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import search from "./search/search.vue";
const { t } = useI18n();
const { getNavColor } = useMenuSetting();
let { navTheme } = useTheme();
const status = ref(false);
function click() {
  status.value = true;
}
</script>

<template>
  <el-tooltip
    class="box-item"
    :content="t('settings.search')"
    placement="bottom"
  >
    <div
      class="box"
      @click="click"
      :style="{ color: navTheme == 1 ? getNavColor.text : '#000' }"
    >
      <Icon class="w-[16px] h-[16px]" icon="akar-icons:search" />
    </div>
  </el-tooltip>

  <!-- 必须加div，否则el-dialog会被添加到全局，导致没办法样式穿透 -->
  <div>
    <el-dialog v-model="status" :show-close="false" width="50%">
      <search />
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
@use "index";
</style>
<style scoped>
:deep(.el-dialog__header) {
  display: none !important;
}
</style>
