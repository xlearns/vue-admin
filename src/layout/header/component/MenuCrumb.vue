<script setup lang="ts">
import { watch, ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { getParentPaths, findRouteByPath } from "@/router/utils";
import { usePermissionStoreWithOut } from "@/stores/modules/permission";
import PageEnum from "@/enums/pageEnum";
import { useMenuNav } from "@/hooks/useMenuNav";
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const data = ref([]);
const permissionStore = usePermissionStoreWithOut();
const { activeKey } = useMenuNav();

function getPath(routePath) {
  routePath = routePath.replace(/redirect\//gim, "");
  let res = [];
  const wholeMenus = permissionStore.getWholeMenus;

  // 当前路由的父级路径
  const parentRoutes = getParentPaths(routePath, wholeMenus)[0];
  const findRoute =
    findRouteByPath(parentRoutes, wholeMenus)?.children?.filter(item => {
      return routePath === item.path;
    })[0] || wholeMenus[0];

  wholeMenus.forEach(item => {
    if (item.path == parentRoutes) {
      res[0] = {
        isable: true,
        ...item
      };
    }
  });
  if (findRoute?.path == PageEnum.BASE_HOME) {
    res = [];
  } else if (res[0]) {
    res[1] = {
      isable: false,
      ...findRoute
    };
  } else {
    res[0] = {
      isable: false,
      ...findRoute
    };
  }
  data.value = res;
}
const isHome = computed(() => {
  return route.path == PageEnum.BASE_HOME;
});

// watchEffect(() => {
//   getPath(route.path);
// });
onMounted(() => {
  getPath(route.path);
});
watch(
  () => route.path,
  () => {
    getPath(route.path);
  }
);
</script>
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">
      <span :class="{ 'text-[#97a8be]': isHome }">
        {{ t("menu.root") }}
      </span>
    </el-breadcrumb-item>
    <el-breadcrumb-item v-for="route in data" :key="route.path">
      <span v-if="!route.isable" class="text-[#97a8be]">{{
        route.meta.title
      }}</span>
      <a v-else> {{ route.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped></style>
