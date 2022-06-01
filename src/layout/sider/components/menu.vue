<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useMenuSetting } from "@/hooks/useMenuSetting";
import { useTheme } from "@/hooks/useTheme";
import sidebarItem from "./sidebarItem.vue";
import { usePermissionStoreWithOut } from "@/stores/modules/permission";
import { useRoute, useRouter } from "vue-router";
import { getParentPaths, findRouteByPath } from "@/router/utils";
import { useTagsView } from "@/hooks/useTagsView";
import { useMenuNav } from "@/hooks/useMenuNav";
import PageEnum from "@/enums/pageEnum";
const { handleTags, multiTags } = useTagsView();
const { data, activeKey, closable, close, current, contextMenuFn } =
  useMenuNav();
defineProps({
  mode: {
    type: String,
    default: () => {
      return "vertical";
    }
  }
});

let defaultActive = ref(null);

const permissionStore = usePermissionStoreWithOut();
const route = useRoute();
const router = useRouter();
const routers = router.options.routes;
let { navTheme } = useTheme();
const { getNavColor, getMenuCollapse } = useMenuSetting();
function setIndex(res) {
  activeKey.value = multiTags.value.findIndex(item => item.path === res.path);
}
const isHome = findRoute => {
  return findRoute.path === PageEnum.BASE_HOME;
};
function getDefaultActive(routePath) {
  routePath = routePath.replace(/redirect\//, "");
  const wholeMenus = permissionStore.getWholeMenus;
  // 当前路由的父级路径
  const parentRoutes = getParentPaths(routePath, wholeMenus)[0];

  const findRoute = findRouteByPath(parentRoutes, wholeMenus)?.children?.filter(
    item => {
      return routePath === item.path;
    }
  )[0];
  defaultActive.value = routePath;

  if (!isHome(findRoute)) {
    handleTags("add", findRoute);
  }
  setIndex(findRoute);
}
onMounted(() => {
  getDefaultActive(route.path);
});

watch(
  () => route.path,
  () => {
    getDefaultActive(route.path);
  }
);

function menuSelect(indexPath, routers) {
  let parentPath = "";
  const parentPathIndex = indexPath.lastIndexOf("/");
  if (parentPathIndex > 0) {
    parentPath = indexPath.slice(0, parentPathIndex);
  }
  function findCurrentRoute(indexPath, routers) {
    for (let i = 0; i < routers.length; i++) {
      const item = routers[i];
      if (item.path === indexPath) {
        return item;
      }
      if (item.children) {
        const result = findCurrentRoute(indexPath, item.children);
        if (result) {
          return result;
        }
      }
    }
  }
  let res = findCurrentRoute(indexPath, routers);
  if (!res?.path) return;
  if (!isHome(res)) {
    handleTags("add", res);
  }
  setIndex(res);
}
</script>

<template>
  <el-menu
    :collapse="getMenuCollapse && navTheme == 0"
    class="h-full overflow-hidden"
    :mode="mode"
    router
    :text-color="getNavColor.text"
    :background-color="getNavColor.bg"
    :default-active="defaultActive"
    @select="indexPath => menuSelect(indexPath, router.getRoutes())"
  >
    <sidebar-item
      v-for="route in permissionStore.getWholeMenus"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    />
  </el-menu>
</template>

<style scoped></style>
