<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useTheme } from "@/hooks/useTheme";
import { useMenuSetting } from "@/hooks/useMenuSetting";
const { getNavColor } = useMenuSetting();
let { navTheme } = useTheme();
</script>

<template>
  <div class="w-[16px] h-[16px] cursor-pointer"  :style="{ color: navTheme == 1 ? getNavColor.text : '#000' }">
    <Icon icon="ep:full-screen" />
  </div>
</template>

<style scoped></style>
