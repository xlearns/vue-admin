<script setup lang="ts">
defineProps({
  showHeader: {
    type: Boolean,
    default: false
  },
  bodyStyle: {
    type: Object,
    default: () => {
      return { padding: "20px" };
    }
  }
});
</script>

<template>
  <el-card class="box-card" shadow="always" :body-style="bodyStyle">
    <template #header v-if="showHeader">
      <slot name="header" />
    </template>
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
