<script setup lang="ts">
import LayoutSideBar from "../sider/index.vue";
import Settings from "./component/Config.vue";
import AppFull from "./component/AppFull.vue";
import Notice from "./component/Notice.vue";
import MenuEvent from "./component/MenuEvent.vue";
import MenuCrumb from "./component/MenuCrumb.vue";
import { useTheme } from "@/hooks/useTheme";
import { AppLocalePicker } from "@/components/application";
import { useMenuSetting } from "@/hooks/useMenuSetting";
const { getNavColor } = useMenuSetting();
let { navTheme } = useTheme();
</script>

<template>
  <el-header
    :class="{ 'justify-between  border-b-1': navTheme == 0 }"
    class="flex items-center border-b-1"
    :style="{ background: navTheme == 0 ? '#fff' : getNavColor.bg }"
  >
    <LayoutSideBar mode="horizontal" v-if="navTheme == 1" />
    <div class="w-full flex justify-between">
      <div>
        <div v-if="navTheme == 0" class="flex items-center">
          <MenuEvent class="mr-2" />
          <MenuCrumb />
        </div>
      </div>
      <div class="flex justify-end">
        <Notice class="mr-5" />
        <AppFull class="mr-5" />
        <AppLocalePicker class="mr-5" />
        <Settings />
      </div>
    </div>
  </el-header>
</template>
<style scoped>
@import "./index.scss";
</style>
