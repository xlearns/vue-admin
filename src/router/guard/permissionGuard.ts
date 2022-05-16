import { type Router } from "vue-router";
import { usePermissionStoreWithOut } from "@/stores/modules/permission";
import { PAGE_NOT_FOUND_ROUTE } from "@/router/routes/basic";
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
    router.addRoute(PAGE_NOT_FOUND_ROUTE);
    permissionStore.setDynamicAddedRoute(true);
    if (to.name === "404") {
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);

      const nextData =
        to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}
