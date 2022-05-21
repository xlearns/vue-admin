<script setup lang="ts">
import { useMenuSetting } from "@/hooks/useMenuSetting";
const { getMenuWidth } = useMenuSetting();
</script>

<template>
  <el-aside :width="getMenuWidth">Aside</el-aside>
</template>

<style scoped></style>
