<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import Tabs from "./notice/Tabs.vue";
import { useTheme } from "@/hooks/useTheme";
import { useMenuSetting } from "@/hooks/useMenuSetting";
import { useNotice } from "./notice/src/useNotice";

const { NoticeData, NewsData, TodoData } = useNotice();

let num = computed(() => {
  return (
    NoticeData.value.length + NewsData.value.length + TodoData.value.length
  );
});
const { getNavColor } = useMenuSetting();
let { navTheme } = useTheme();
</script>

<template>
  <div
    class="box"
    :style="{ color: navTheme == 1 ? getNavColor.text : '#000' }"
  >
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-badge :value="num">
          <Icon class="w-[16px] h-[16px]" icon="carbon:notification" />
        </el-badge>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <div class="w-336px">
            <Tabs />
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
@import "./index.scss";
</style>
