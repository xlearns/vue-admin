<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useTheme } from "@/hooks/useTheme";
import { useMenuSetting } from "@/hooks/useMenuSetting";
import { ref, watchEffect } from "vue";
import Menu from "@/layout/sider/components/menu.vue";
const {
  isMinScreen,
  getSiderShow,
  getNavColor,
  setMenuCollapse,
  getMenuCollapse
} = useMenuSetting();
let { navTheme } = useTheme();
let drawer = ref(false);
watchEffect(() => {
  if (!isMinScreen.value) {
    drawer.value = false;
  }
});
function collapse() {
  if (getSiderShow.value) {
    setMenuCollapse(!getMenuCollapse.value);
  } else {
    setMenuCollapse(false);
    drawer.value = true;
  }
}
</script>

<template>
  <div>
    <div
      class="w-[16px] h-[16px] cursor-pointer"
      :style="{ color: navTheme == 1 ? getNavColor.text : '#000' }"
      @click="collapse"
    >
      <Icon
        width="100%"
        height="100%"
        :icon="
          getMenuCollapse || !getSiderShow
            ? 'lucide:sidebar-close'
            : 'lucide:sidebar-open'
        "
        :horizontalFlip="true"
        :verticalFlip="true"
      />
    </div>
    <div class="mini-menu">
      <el-drawer
        direction="ltr"
        v-model="drawer"
        :with-header="false"
        size="210px"
      >
        <Menu mode="vertical" />
      </el-drawer>
    </div>
  </div>
</template>

<style scoped>
.mini-menu :deep(.el-drawer__body) {
  overflow: hidden;
  padding: 0;
}

.mini-menu :deep(.el-drawer) {
  transition: none;
}

.mini-menu :deep(.el-menu) {
  border: none;
}
</style>
