<script setup lang="ts">
import LayoutSideBar from "./sider/index.vue";
import LayoutHeader from "./header/index.vue";
import LayoutContent from "./content/index.vue";
import LayoutFooter from "./footer/index.vue";
import LayoutMultipleHeader from "./header/MultipleHeader.vue";
import { useTheme } from "@/hooks/useTheme";
import { computed } from "vue";

let { navTheme } = useTheme();

const layoutClass = computed(() => {
  return "";
});
</script>

<template>
  <el-container class="h-full">
    <LayoutHeader v-if="false" />
    <el-container :class="[layoutClass]">
      <LayoutSideBar v-if="navTheme == 0" />
      <el-container direction="vertical">
        <LayoutMultipleHeader />
        <LayoutContent />
        <LayoutFooter />
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped></style>
