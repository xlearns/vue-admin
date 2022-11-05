import PageEnum from "@/enums/pageEnum";
import { RoleEnum } from "@/enums/roleEnum";
const homeRouter = [
  {
    path: "/",
    name: "Root",
    key: 0,
    component: () => import("@/layout/index.vue"),
    redirect: PageEnum.BASE_HOME,
    meta: {
      title: "root",
      icon: "ci:home-fill"
    },
    children: [
      {
        path: "/welcome",
        name: "welcome",
        component: () => import("@/views/welcome.vue"),
        meta: {
          title: "welcome"
        }
      },
      {
        path: "/grid",
        name: "grid",
        component: () => import("@/views/welcome/grid.vue"),
        meta: {
          title: "grid布局"
        }
      }
    ]
  }
];

export default homeRouter;
