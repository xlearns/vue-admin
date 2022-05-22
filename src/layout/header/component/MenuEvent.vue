<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useTheme } from "@/hooks/useTheme";
import { useMenuSetting } from "@/hooks/useMenuSetting";
const { getNavColor, setMenuCollapse, getMenuCollapse } = useMenuSetting();
let { navTheme } = useTheme();
</script>

<template>
  <div
    class="w-[16px] h-[16px] cursor-pointer"
    :style="{ color: navTheme == 1 ? getNavColor.text : '#000' }"
    @click="setMenuCollapse(!getMenuCollapse)"
  >
    <Icon
      width="100%"
      height="100%"
      icon="quill:hamburger-sidebar"
      :horizontalFlip="true"
      :verticalFlip="true"
    />
  </div>
</template>

<style scoped></style>
