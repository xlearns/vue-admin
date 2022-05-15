import router from "@/router";
import { usePermissionStore } from "@/stores/modules/permission";

export function usePermission() {
  const permissionStore = usePermissionStore();

  async function refresh() {
    resume();
  }

  async function resume() {
    const routes = await permissionStore.buildRoutesAction();
    routes.forEach(route => {
      router.addRoute(route);
    });
  }

  //是否有权限
  function hasPermission() {}

  return {
    refresh,
    resume,
    hasPermission
  };
}
