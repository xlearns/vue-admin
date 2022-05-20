<script setup lang="ts">
import { watch, watchEffect, ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
let val = ref(true);
const isDark = useDark();
const toggleDark = useToggle(isDark);
const body = document.documentElement as HTMLElement;
watch(
  () => val.value,
  () => {
    toggleDark();
  }
);
watchEffect(() => {
  if (isDark.value) {
    body.setAttribute("data-theme", "dark");
  } else {
    body.setAttribute("data-theme", "");
  }
});
</script>

<template>
  <div>
    <el-switch v-model="val" inline-prompt active-text="Y" inactive-text="N" />
  </div>
</template>

<style scoped></style>
