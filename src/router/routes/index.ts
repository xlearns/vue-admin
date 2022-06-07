import type { AppRouteModule } from "./types";
import PageEnum from "@/enums/pageEnum";
import { errorRouter, PAGE_NOT_FOUND_ROUTE } from "./basic";
const Layout = () => import("@/layout/index.vue");

// 获取所有modules下的ts文件
const modules = import.meta.globEager("./modules/**/*.ts");

const routeModuleList = [];

Object.keys(modules).forEach(key => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

function regulation() {
  let arr = [...routeModuleList];
  const index = routeModuleList.findIndex(v => {
    return v.path == "/";
  });
  const newArr = arr.splice(index, 1);
  arr = newArr.concat(arr);
  return arr;
}
// addRouter动态加入路由
// export const asyncRoutes = [...routeModuleList];
export const asyncRoutes = [...regulation()];

//不需要展示菜单中
export const remainingRouter = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/redirect",
    component: Layout,
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/redirect.vue")
      }
    ]
  }
];
export const RemainingRouter = [...remainingRouter];

export const basicRoutes = [errorRouter];
