<script setup lang="ts">
import { ref } from "vue";
defineProps({
  status: {
    type: Boolean,
    default: false
  }
});
const search = ref("");
</script>

<template>
  <div>
    <el-input placeholder="请输入关键词搜索" v-model="search" />
    <div class="container">
      <el-empty v-if="true" description="暂无搜索结果" />
    </div>
  </div>
</template>
