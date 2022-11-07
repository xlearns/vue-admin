<script lang="ts" setup>
import { Icon as IconifyIcon } from "@iconify/vue";
import { iconProps } from "./icon";
defineProps(iconProps);

const style = computed(() => {
  const css = {
    outline: "none"
  };
  return css;
});
</script>
<template>
  <IconifyIcon :icon="icon" :style="style" />
</template>
