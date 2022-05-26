<script setup>
import { ref, watch } from "vue";
import { useMenuNav } from "@/hooks/useMenuNav";

const { current, show } = useMenuNav();

const context = ref();
watch(
  () => context.value?.show,
  () => {
    show.value = context.value?.show;
  }
);
const emit = defineEmits(["contextMenuFn"]);
let data = [
  {
    name: "重新加载",
    key: "reload"
  },
  {
    name: "关闭标签页",
    key: "closecurrent"
  },
  {
    name: "关闭左侧标签页",
    key: "closeleft"
  },
  {
    name: "关闭右侧标签页",
    key: "closeright"
  },
  {
    name: "关闭其它标签页",
    key: "closeother"
  },
  {
    name: "关闭全部标签页",
    key: "closeall"
  }
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
      @click="fn(item.key)"
      >{{ item.name }}</context-menu-item
    >
  </context-menu>
</template>

<style scoped>
:deep(.v-contextmenu-item) {
  padding: 5px 10px;
}
</style>
