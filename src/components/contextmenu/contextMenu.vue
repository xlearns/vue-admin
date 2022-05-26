<script setup>
const emit = defineEmits(["contextMenuFn"]);
let data = [
  "重新加载",
  "关闭标签页",
  "关闭左侧标签页",
  "关闭右侧标签页",
  "关闭其它标签页",
  "关闭全部标签页"
];
function fn(type) {
  emit("contextMenuFn", type);
}
</script>

<template>
  <context-menu ref="context" name="context-menu-1">
    <context-menu-item
      v-for="(item, index) in data"
      :key="index"
      @click="fn(item)"
      >{{ item }}</context-menu-item
    >
  </context-menu>
</template>

<style scoped>
:deep(.v-contextmenu-item) {
  padding: 5px 10px;
}
</style>
