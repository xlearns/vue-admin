<script setup lang="ts">
import { useMenuSetting } from "@/hooks/useMenuSetting";
import LogoSvg from "@/assets/logo.svg";

const props = defineProps({
  mode: {
    type: String,
    default: () => {
      return "vertical";
    }
  },
  showTitle: {
    type: Boolean,
    default: () => {
      return true;
    }
  },
  title: {
    type: String,
    default: () => {
      return "VUE3-Admin";
    }
  }
});
const { getNavColor, getMenuCollapse, getMenuWidth } = useMenuSetting();
</script>

<template>
  <div
    :style="{
      background: getNavColor.bg,
      color: getNavColor.text,
      width: getMenuWidth
    }"
    class="flex items-center AppLogo"
  >
    <LogoSvg class="w-2em h-2em" />
    <span
      class="ml-2 truncate md:opacity-100 AppLogo__title"
      v-show="showTitle"
      >{{ title }}</span
    >
  </div>
</template>

<style scoped lang="scss">
.AppLogo {
  display: flex;
  align-items: center;
  padding-left: 15px;
  // width: calc(100% - 1px);
  transition: all 0.2s ease;
  box-sizing: border-box;
  cursor: pointer;

  &.collapsed-show-title {
    padding-left: 20px;
  }

  &__title {
    font-size: 16px;
    font-weight: 700;
    transition: all 0.5s;
    line-height: normal;
  }
}
</style>
