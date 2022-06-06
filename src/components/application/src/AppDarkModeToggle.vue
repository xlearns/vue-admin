<script setup lang="ts">
import { watch, watchEffect, ref } from "vue";
import { useDarkModel } from "@/hooks/useDarkModel";
import { useTheme } from "@/hooks/useTheme";
import { useMenuSetting } from "@/hooks/useMenuSetting";
let { myToggleTheme } = useTheme();
const { initTheme } = useMenuSetting();
let { isDark, change } = useDarkModel();
let val = ref(isDark.value);
watch(
  () => val.value,
  () => {
    change();
    initTheme();
  }
);
</script>

<template>
  <div>
    <el-switch
      class="icon-svg"
      v-model="val"
      inline-prompt
      active-text="Y"
      inactive-text="N"
    />
  </div>
</template>

<style scoped></style>
