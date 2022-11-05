import { routesItems } from "@/router/routes/types";
export function createTitleGuard(router) {
  router.beforeEach(async (to, from, next) => {
    to.matched.some((item: routesItems) => {
      if (!item.meta.title) {
        return "";
      }
      document.title = item.meta.title;
    });
    next();
  });
}
