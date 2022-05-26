<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useMenuNav } from "@/hooks/useMenuNav";
import { Icon } from "@iconify/vue";
const { activeKey, current, show, ableRight, ableLeft } = useMenuNav();

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
function fn(type, bool: boolean) {
  if (bool) return;
  emit("contextMenuFn", type);
}
const isdisable = computed(() => {
  return activeKey.value == current.value;
});

function leftRight(index) {
  let res = !isdisable.value;

  if (!res && index == 2) {
    res = !ableRight.value;
  } else if (!res && index == 3) {
    res = !ableLeft.value;
  } else if (index == 5) {
    res = false;
  }

  return res;
}
</script>

<template>
  <context-menu ref="context" name="context-menu-1">
    <context-menu-item
      v-for="(item, index) in data"
      :key="index"
      :disabled="leftRight(index)"
      @click="fn(item.key, !isdisable && index != 5)"
    >
      <Icon icon="foundation:refresh" v-if="index == 0" />
      <Icon icon="ci:close-small" v-if="index == 1" />
      <Icon icon="bx:arrow-to-left" v-if="index == 2" />
      <Icon icon="bx:arrow-to-right" v-if="index == 3" />
      <Icon icon="codicon:close-all" v-if="index == 4" />
      <Icon icon="ant-design:minus-outlined" v-if="index == 5" />
      {{ item.name }}</context-menu-item
    >
  </context-menu>
</template>

<style scoped>
:deep(.v-contextmenu-item) {
  padding: 5px 10px;
}
</style>
