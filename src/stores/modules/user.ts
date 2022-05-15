import { defineStore } from "pinia";
import { usePermissionStore } from "./permission";
import { router } from "@/router";

const permissionStore = usePermissionStore();
export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    // roleList
    roleList: []
  }),
  getters: {
    getRoleList(): string[] | number[] {
      return this.roleList.length > 0 ? this.roleList : [];
    }
  },
  actions: {
    setRoleList(roleList) {
      this.roleList = roleList;
    },
    async login() {
      return this.afterLoginAction();
    },
    async afterLoginAction() {
      const routes = await permissionStore.buildRoutesAction();
      routes.forEach(route => {
        router.addRoute(route);
      });
      //  404
      //  router.addRoute()
    }
  }
});
