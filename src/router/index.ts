import type { RouteRecordRaw } from "vue-router";

import { createRouter, createWebHashHistory } from "vue-router";

import { basicRoutes } from "./routes";

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];

const getRouteNames = function (array: any[]) {
  array.forEach(item => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
};

getRouteNames(basicRoutes);

// app router

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 不允许尾部的斜线
  strict: true,
  // 始终滚动到顶部
  scrollBehavior: () => ({ left: 0, top: 0 })
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach(route => {});
}

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}
