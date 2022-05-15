import { type Router } from "vue-router";
import { usePermissionStoreWithOut } from "@/stores/modules/permission";

export function createPermissionGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    // 避免死循环
    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }
    const routes = await permissionStore.buildRoutesAction();
    routes.forEach(route => {
      router.addRoute(route);
    });
    permissionStore.setDynamicAddedRoute(true);
    const redirectPath = (from.query.redirect || to.path) as string;
    const redirect = decodeURIComponent(redirectPath);
    const nextData =
      to.path === redirect ? { ...to, replace: true } : { path: redirect };
    next(nextData);
  });
}
