<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
const props = defineProps({
  item: {
    type: Object
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ""
  }
});

const { t } = useI18n();

function resolvePath(routePath) {
  const httpReg = /^http(s?):\/\//;
  if (httpReg.test(routePath) || httpReg.test(props.basePath)) {
    return routePath || props.basePath;
  } else {
    return routePath;
  }
}
</script>

<template>
  <el-menu-item
    v-if="!(item.children && item.children.length > 0)"
    :key="item.path"
    :index="resolvePath(item.path)"
  >
    <el-icon v-if="item.meta && item.meta.icon">
      <Icon :icon="item.meta.icon"
    /></el-icon>
    <span>{{ item.meta.title }}</span>
  </el-menu-item>

  <el-sub-menu v-else :index="resolvePath(item.path)">
    <template #title>
      <el-icon v-if="item.meta && item.meta.icon">
        <Icon :icon="item.meta.icon"
      /></el-icon>
      <span>{{ t(`menu.${item.meta.title}`) }}</span>
    </template>
    <sidebar-item
      v-for="child in item.children"
      :key="child.path"
      :is-nest="true"
      :item="child"
      :base-path="resolvePath(child.path)"
      class="nest-menu"
    />
  </el-sub-menu>
</template>

<style lang="scss" scoped>
.el-menu-item.is-active,
.el-sub-menu.is-active {
  font-weight: bold;
  color: #70b6ff;
}
</style>
