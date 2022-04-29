import { createRouter, createWebHistory } from "vue-router";
import NProgress from "@/utils/progress";
import { useStorage } from "@vueuse/core";
import { initRouter } from "./utils";

// 路由
import mustRouter from "./routes/modules/must";
import homeRouter from "./routes/modules/home";

// 原始静态路由（未做任何处理）
const routes = [...homeRouter];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes.concat(...mustRouter)
});

const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  const token = useStorage("token", "");

  NProgress.start();
  if (token.value) {
    initRouter(token).then(router => {
      // console.log(router);
    });
    next();
  } else {
    if (to.path !== "/login") {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next("/login");
      }
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
