<script setup lang="ts">
import { watch, watchEffect, ref } from "vue";
import { useDarkModel } from "@/hooks/useDarkModel";

let { isDark, change } = useDarkModel();
let val = ref(isDark.value);
watch(
  () => val.value,
  () => {
    change();
  }
);
</script>

<template>
  <div>
    <el-switch v-model="val" inline-prompt active-text="Y" inactive-text="N" />
  </div>
</template>

<style scoped></style>
