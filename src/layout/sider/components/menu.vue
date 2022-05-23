<script setup lang="ts">
import { useMenuSetting } from "@/hooks/useMenuSetting";
import { useTheme } from "@/hooks/useTheme";
import { Icon } from "@iconify/vue";
defineProps({
  mode: {
    type: String,
    default: () => {
      return "vertical";
    }
  }
});
let { navTheme } = useTheme();
const { getNavColor, getMenuCollapse } = useMenuSetting();
</script>

<template>
  <el-menu
    :collapse="getMenuCollapse && navTheme == 0"
    class="h-full overflow-hidden"
    :mode="mode"
    :text-color="getNavColor.text"
    :background-color="getNavColor.bg"
    default-active="1"
  >
    <el-menu-item index="1"
      ><el-icon> <Icon icon="ci:home-fill" /></el-icon>
      <span>Processing Center</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><Icon icon="ci:home-fill" /></el-icon>
        <span>Processing Center</span>
      </template>
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
    <el-menu-item index="3" disabled
      ><el-icon><Icon icon="ci:home-fill" /></el-icon>
      <span>Processing Center</span></el-menu-item
    >
    <el-menu-item index="4"
      ><el-icon><Icon icon="ci:home-fill" /></el-icon>
      <span>Processing Center</span></el-menu-item
    >
  </el-menu>
</template>

<style scoped></style>
