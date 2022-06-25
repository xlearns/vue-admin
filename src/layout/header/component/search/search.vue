<script setup lang="ts">
import { ref } from "vue";
defineProps({
  status: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div>
    <el-input placeholder="请输入关键词搜索" />
  </div>
</template>
