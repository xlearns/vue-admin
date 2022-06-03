<script setup lang="ts">
import ECard from "@/components/card/index.vue";
</script>

<template>
  <el-row :gutter="20">
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
      ><div class="grid-content bg-purple"
    /></el-col>
    <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
    <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
    <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
  </el-row>
</template>

<style scoped></style>
