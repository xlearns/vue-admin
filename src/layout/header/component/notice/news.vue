<script setup lang="ts">
import { useNotice } from "./src/useNotice";
const { NewsData } = useNotice();
</script>

<template>
  <el-scrollbar height="330px">
    <div class="py-4px px-24px">
      <div
        class="flex justify-betwwen py-12px"
        :class="{ 'border-b-1': index != NewsData.length - 1 }"
        v-for="(item, index) in NewsData"
        :key="index"
      >
        <el-avatar class="mr-16px"> user </el-avatar>
        <div class="flex-1">
          <div>{{ item.title }}</div>
          <div>{{ item.content }}</div>
          <div>{{ item.time }}</div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped></style>
