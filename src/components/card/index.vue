<script setup lang="ts"></script>

<template>
  <el-card class="box-card" shadow="always">
    <slot />
  </el-card>
</template>

<style lang="scss" scoped>
// 高度自适应
.box-card {
  height: 100%;
  min-height: 100%;
}
</style>
