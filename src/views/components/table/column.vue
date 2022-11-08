<script setup lang="ts">
import { unref } from "vue";
import type { PropType } from "vue";
import type { HeadData } from "@c/table/src/type";

defineProps({
  column: {
    type: Array as PropType<HeadData[]>,
    default: () => []
  }
});
</script>
<template>
  <ElScrollbar>
    <div v-for="item in unref(column)" :key="item.prop">
      <ElCheckbox v-model="item.show" checked>{{ item.label }}</ElCheckbox>
    </div>
  </ElScrollbar>
</template>
