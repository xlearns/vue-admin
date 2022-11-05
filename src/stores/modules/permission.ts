import { defineStore } from "pinia";
import { toRaw } from "vue";
import { store } from "@/stores";
import { useUserStore } from "./user";
import { asyncRoutes, basicRoutes } from "@/router/routes";

function filter(tree, fn) {
  return tree
    .map((node: any) => ({ ...node }))
    .filter(node => {
      return fn(node);
    });
}
export const usePermissionStore = defineStore({
  id: "permission",
  state: () => ({
    permCodeList: [],
    wholeMenus: []
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList;
    },
    getIsDynamicAddedRoute() {
      return this.isDynamicAddedRoute;
    },
    getWholeMenus() {
      return this.wholeMenus;
    }
  },
  actions: {
    setWholeMenus(router) {
      this.wholeMenus = [...router, ...basicRoutes];
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList;
    },
    async buildRoutesAction() {
      let routes = [];
      const userStore = useUserStore();
      const roleList = toRaw(userStore.getRoleList) || [];
      const routeFilter = route => {
        const { meta } = route;
        const { roles } = meta || {};
        if (!roles) return true;
        return roleList.some(role => roles.includes(role));
      };

      const routeRemoveIgnoreFilter = route => {
        const { meta } = route;
        const { ignoreRoute } = meta || {};
        return !ignoreRoute;
      };

      routes = filter(asyncRoutes, routeFilter);
      this.setWholeMenus(routes);
      return routes;
    }
  }
});

export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
