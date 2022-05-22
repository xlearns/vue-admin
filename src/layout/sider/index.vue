<script setup lang="ts">
import { useMenuSetting } from "@/hooks/useMenuSetting";
import { computed } from "vue";
import { useTheme } from "@/hooks/useTheme";
let { navTheme } = useTheme();
defineProps({
  mode: {
    type: String,
    default: () => {
      return "vertical";
    }
  }
});
const { getMenuWidth } = useMenuSetting();
const menuWidth = computed(() => {
  if (navTheme.value == 0) return getMenuWidth + "px";
  return "50%";
});
</script>

<template>
  <el-aside :width="menuWidth" class="h-full">
    <el-menu class="h-full overflow-hidden" :mode="mode">
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4">Orders</el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped></style>
