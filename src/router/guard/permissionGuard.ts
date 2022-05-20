import { type Router } from "vue-router";
import { usePermissionStoreWithOut } from "@/stores/modules/permission";
import { PAGE_NOT_FOUND_ROUTE } from "@/router/routes/basic";
import { useUserStore } from "@/stores/modules/user";
import PageEnum from "@/enums/pageEnum";

const LOGIN_PATH = PageEnum.BASE_LOGIN;
const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  const userStore = useUserStore();
  const permissionStore = usePermissionStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    const token = userStore.getToken;
    if (whitePathList.includes(to.path as PageEnum)) {
      // 已经登录
      if (to.path === LOGIN_PATH && token) {
        next((to.query?.redirect as string) || "/");
      }
      next();
      return;
    }
    if (!token) {
      // if (to.meta.ignoreAuth) {
      //   next();
      //   return;
      // }
      const redirectData: {
        path: string;
        replace: boolean;
        query?: Recordable<string>;
      } = {
        path: LOGIN_PATH,
        replace: true
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        };
      }
      next(redirectData);
      return;
    }
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
