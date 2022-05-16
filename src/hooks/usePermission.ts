import router from "@/router";
import { usePermissionStore } from "@/stores/modules/permission";
import { useUserStore } from "@/stores/modules/user";
import { intersection } from "lodash-es";

export function usePermission() {
  const userStore = useUserStore();

  const permissionStore = usePermissionStore();

  async function refresh() {
    resume();
  }

  //重新获取
  async function resume() {
    const routes = await permissionStore.buildRoutesAction();
    routes.forEach(route => {
      router.addRoute(route);
    });
  }

  //是否有权限
  function hasPermission(value, def = true) {
    if (!value) return def;
    if (!Array.isArray(value)) {
      return (userStore.getRoleList as Array<any>).includes(value);
    }
    return intersection(value, userStore.getRoleList).length > 0;
  }
  // 改变权限
  async function changeRole(roles) {
    if (!Array.isArray(roles)) {
      roles = [roles];
    }
    userStore.setRoleList(roles);
    return resume();
  }
  return {
    changeRole,
    refresh,
    resume,
    hasPermission
  };
}
