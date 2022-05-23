<script setup lang="ts">
import { useMenuSetting } from "@/hooks/useMenuSetting";
import { computed } from "vue";
import { useTheme } from "@/hooks/useTheme";
import Menu from "./components/menu.vue";
let { navTheme } = useTheme();
defineProps({
  mode: {
    type: String,
    default: () => {
      return "vertical";
    }
  }
});
const { getMenuWidth, getNavColor, getMenuCollapse } = useMenuSetting();
const menuWidth = computed(() => {
  if (navTheme.value == 0) {
    if (getMenuCollapse.value) {
      return "auto";
    }
    return getMenuWidth.value;
  }
  return "50%";
});
</script>
<template>
  <el-aside :width="menuWidth" class="h-full"> <Menu :mode="mode" /> </el-aside>
</template>

<style scoped>
@import "./index.scss";
</style>
