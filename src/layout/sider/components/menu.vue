<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useMenuSetting } from "@/hooks/useMenuSetting";
import { useTheme } from "@/hooks/useTheme";
import sidebarItem from "./sidebarItem.vue";
import { usePermissionStoreWithOut } from "@/stores/modules/permission";
import { useRoute, useRouter } from "vue-router";
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
const routers = useRouter().options.routes;
let { navTheme } = useTheme();
const { getNavColor, getMenuCollapse } = useMenuSetting();

// 通过path获取父级路径
function getParentPaths(path, routes) {
  // 深度遍历查找
  function dfs(routes, path, parents) {
    for (let i = 0; i < routes.length; i++) {
      const item = routes[i];
      // 找到path则返回父级path
      if (item.path === path) return parents;
      // children不存在或为空则不递归
      if (!item.children || !item.children.length) continue;
      // 往下查找时将当前path入栈
      parents.push(item.path);

      if (dfs(item.children, path, parents).length) return parents;
      // 深度遍历查找未找到时当前path 出栈
      parents.pop();
    }
    // 未找到时返回空数组
    return [];
  }

  return dfs(routes, path, []);
}

// 查找对应path的路由信息
function findRouteByPath(path, routes) {
  let res = routes.find((item: { path: string }) => item.path == path);
  if (res) {
    return res;
  } else {
    for (let i = 0; i < routes.length; i++) {
      if (
        routes[i].children instanceof Array &&
        routes[i].children.length > 0
      ) {
        res = findRouteByPath(path, routes[i].children);
        if (res) {
          return res;
        }
      }
    }
    return null;
  }
}

function getDefaultActive(routePath) {
  const wholeMenus = permissionStore.getWholeMenus;
  // 当前路由的父级路径
  const parentRoutes = getParentPaths(routePath, wholeMenus)[0];
  defaultActive.value = findRouteByPath(
    parentRoutes,
    wholeMenus
  )?.children[0]?.path;
}
onMounted(() => {
  getDefaultActive(route.path);
});

function menuSelect(a, b) {}
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
    @select="indexPath => menuSelect(indexPath, routers)"
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
