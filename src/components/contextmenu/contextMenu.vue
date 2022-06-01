<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useMenuNav } from "@/hooks/useMenuNav";
import { Icon } from "@iconify/vue";
const { activeKey, current, show, leftRight, tagsData, isdisable } =
  useMenuNav();

const context = ref();
watch(
  () => context.value?.show,
  () => {
    show.value = context.value?.show;
  }
);
const emit = defineEmits(["contextMenuFn"]);

function fn(type, bool: boolean) {
  if (bool) return;
  emit("contextMenuFn", type);
}
</script>

<template>
  <context-menu ref="context" name="context-menu-1">
    <context-menu-item
      v-for="(item, index) in tagsData"
      :key="index"
      :disabled="leftRight(index)"
      @click="fn(item.key, !isdisable && index != 5)"
    >
      <Icon :icon="item.url" />
      {{ item.name }}</context-menu-item
    >
  </context-menu>
</template>

<style scoped>
:deep(.v-contextmenu-item) {
  padding: 5px 10px;
}
</style>
