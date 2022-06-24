<script setup lang="ts">
import LayoutSideBar from "../sider/index.vue";
import Settings from "./component/Config.vue";
import AppFull from "./component/AppFull.vue";
import Notice from "./component/Notice.vue";
import User from "./component/User.vue";
import MenuEvent from "./component/MenuEvent.vue";
import MenuCrumb from "./component/MenuCrumb.vue";
import MenuNav from "./component/MenuNav.vue";
import { useTheme } from "@/hooks/useTheme";
import { AppLocalePicker } from "@/components/application";
import { useMenuSetting } from "@/hooks/useMenuSetting";
const { getNavColor, getSiderShow } = useMenuSetting();
let { navTheme } = useTheme();
</script>

<template>
  <el-header
    :class="{ 'justify-between  border-b-1': navTheme == 0 }"
    class="flex items-center border-b-1"
    :style="{
      background: navTheme == 0 ? '#fff' : getNavColor.bg
    }"
  >
    <LayoutSideBar mode="horizontal" v-if="navTheme == 1" />
    <div class="w-full flex justify-between h-full items-center">
      <div>
        <div v-if="navTheme == 0" class="flex items-center">
          <MenuEvent class="mr-2" />
          <MenuCrumb v-if="getSiderShow" />
        </div>
      </div>
      <div class="flex justify-end items-center h-full">
        <Notice />
        <AppFull />
        <AppLocalePicker />
        <User />
        <Settings />
      </div>
    </div>
  </el-header>
  <MenuNav />
</template>
<style scoped>
@import "./index.scss";
</style>
