<script setup lang="ts">
import Card from "@c/card";

defineProps({
  data: {
    type: Object,
    default: () => {
      return [];
    }
  }
});
</script>

<template>
  <el-row :gutter="20">
    <el-col
      :xs="24"
      :sm="12"
      :md="6"
      :lg="6"
      :xl="6"
      v-for="(item, index) in data"
      :key="index"
      class="mb-2"
    >
      <div class="h-172px">
        <Card showHeader>
          <template #header>
            <div class="flex justify-between">
              <span> {{ item.title }}</span>
              <el-tag>{{ item.time }}</el-tag>
            </div>
          </template>
          {{ item.value }}
        </Card>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped></style>
