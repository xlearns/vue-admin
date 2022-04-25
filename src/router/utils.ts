import { router } from "./index";
import test from "./test";
const modulesRoutes = import.meta.glob("/src/views/**/*.{vue,tsx}");

// 转换
function addAsyncRoutes(arrRoutes) {
  if (!arrRoutes || !arrRoutes.length) return;
  const modulesRoutesKeys = Object.keys(modulesRoutes);
  arrRoutes.forEach(element => {
    const index = element?.component
      ? modulesRoutesKeys.findIndex(ev => ev.includes(element.component))
      : modulesRoutesKeys.findIndex(ev => ev.includes(element.path));

    element.component = modulesRoutes[modulesRoutesKeys[index]];
    element.children && addAsyncRoutes(element.children);
  });
  return arrRoutes;
}

// 初始化路由
export function initRouter(token) {
  return new Promise(resolve => {
    // 接口
    const res = test;
    addAsyncRoutes(res).forEach(item => {
      // 防止重复添加路由
      if (
        router.options.routes[0].children.findIndex(
          value => value.path === item.path
        ) !== -1
      )
        return;
      !router.hasRoute(item?.name) && router.addRoute(item);
      resolve(router);
    });
    router.addRoute({
      path: "/:pathMatch(.*)",
      redirect: "/error/404"
    });
  });
}

// 重置路由
export function resetRouter(): void {}

// 是否有权限
export function hasPermissions() {}
