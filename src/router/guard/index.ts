import { createPermissionGuard } from "./permissionGuard";
import { createTitleGuard } from "./title";

import nProgress from "@/utils/progress";
import { type Router } from "vue-router";

export function setupRouterGuard(router: Router) {
  createProgressGuard(router);
  createPermissionGuard(router);
  createTitleGuard(router);
}

export function createProgressGuard(router: Router) {
  router.beforeEach(async to => {
    if (to.meta.loaded) {
      return true;
    }
    nProgress.start();
    return true;
  });
  router.afterEach(async to => {
    nProgress.done();
    return true;
  });
}
