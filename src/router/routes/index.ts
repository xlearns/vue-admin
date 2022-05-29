import type { AppRouteModule } from "./types";
import PageEnum from "@/enums/pageEnum";
import { errorRouter, PAGE_NOT_FOUND_ROUTE } from "./basic";
// 获取所有modules下的ts文件
const modules = import.meta.globEager("./modules/**/*.ts");

const routeModuleList = [];

Object.keys(modules).forEach(key => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

// addRouter动态加入路由
export const asyncRoutes = [...routeModuleList];

// 登录
export const LoginRoute: AppRouteModule = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/login/login.vue"),
  meta: {
    title: "登录"
  }
};
export const RemainingRouter = [LoginRoute];

export const basicRoutes = [errorRouter];
