<script setup lang="ts">
import { onMounted } from "vue";
import { usePermission } from "@/hooks/usePermission";
import { useStorage } from "@vueuse/core";
const { changeRole, hasPermission } = usePermission();

function change(key: string) {
  changeRole(key);
  location.reload();
}
</script>

<template>
  <div class="test"></div>
  <el-button @click="change('super')">super</el-button>
  <el-button @click="change('test')">test</el-button>
  <br />
  <!-- 需要刷新才会生效 -->
  <span v-permission="'super'">super</span>
  <span v-permission="'test'">test</span>
  <!-- 不需要刷新才会生效 -->
  <span v-if="hasPermission('super')">1</span>
  <span v-if="hasPermission('test')">2</span>
</template>
<style scoped>
@import url("@/style/login.scss");
</style>
