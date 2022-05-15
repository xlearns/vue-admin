import { defineStore } from "pinia";
import { toRaw } from "vue";
import { store } from "@/stores";
import { useUserStore } from "./user";

export const usePermissionStore = defineStore({
  id: "permission",
  state: () => ({
    permCodeList: []
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList;
    }
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList;
    },
    async buildRoutesAction() {
      const routes = [];
      const userStore = useUserStore();
      const roleList = toRaw(userStore.getRoleList) || [];
      const roteFilter = route => {
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
      return routes;
    }
  }
});
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
