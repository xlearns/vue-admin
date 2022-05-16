import { defineStore } from "pinia";
import { usePermissionStore } from "./permission";
import { router } from "@/router";
import { ROLES_KEY } from "@/enums/cacheEnum";
import { useStorage } from "@vueuse/core";
const rolesAuthCache = useStorage(ROLES_KEY, []);

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    // roleList
    roleList: []
  }),
  getters: {
    getRoleList(): string[] | number[] {
      return this.roleList.length > 0 ? this.roleList : rolesAuthCache.value;
    }
  },
  actions: {
    setRoleList(roleList) {
      this.roleList = roleList;
      rolesAuthCache.value = roleList;
    },
    async login() {
      return this.afterLoginAction();
    },
    async afterLoginAction() {
      const permissionStore = usePermissionStore();
      const routes = await permissionStore.buildRoutesAction();
      routes.forEach(route => {
        router.addRoute(route);
      });
    }
  }
});
