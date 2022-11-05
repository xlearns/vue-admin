<script setup lang="ts">
const props = defineProps({
  offsetHeight: {
    type: Number
  },
  offsetWidth: {
    type: Number
  },
  defaultStyle: {
    type: Array
  },
  img: {
    type: String
  },
  content: {
    type: String
  }
});
</script>

<template>
  <div
    :style="{
      height: `${offsetHeight}px`,
      width: `${offsetWidth}px`,
      ...defaultStyle
    }"
  >
    <div style="text-align: center">
      <div>
        <img :src="img" height="30%" width="30%" />
      </div>
      <div>{{ content || "暂无数据" }}</div>
    </div>
  </div>
</template>

<style scoped></style>
