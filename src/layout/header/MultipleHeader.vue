<script setup lang="ts">
import LayoutSideBar from "../sider/index.vue";
import Settings from "./component/Config.vue";
import { useTheme } from "@/hooks/useTheme";
let { navTheme } = useTheme();
</script>

<template>
  <el-header
    :class="[
      navTheme == 0
        ? 'justify-end bg-[#fff]'
        : 'justify-between bg-[#001529] border-b-1'
    ]"
    class="flex items-center border-b-1"
  >
    <LayoutSideBar mode="horizontal" v-if="navTheme == 1" />
    <Settings />
  </el-header>
</template>
<style scoped>
@import "./index.scss";
</style>
