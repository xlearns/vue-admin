<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Result from "./result.vue";
import { asyncRoutes } from "@/router/routes";

defineProps({
  status: {
    type: Boolean,
    default: false
  }
});
/** 菜单树形结构 */
console.log(asyncRoutes);

const search = ref("");
const res = ref([]);
watchEffect(() => {
  res.value = asyncRoutes.filter(item => {
    return search.value && item.meta.title.includes(search.value);
  });
});
</script>

<template>
  <div>
    <el-input placeholder="请输入关键词搜索" v-model="search" />
    <div class="container">
      <el-empty v-if="res.length == 0" description="暂无搜索结果" />
      <!-- 结果 -->
      <Result v-else :options="res" />
    </div>
  </div>
</template>
