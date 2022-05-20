import PageEnum from "@/enums/pageEnum";
import { RoleEnum } from "@/enums/roleEnum";
const homeRouter = [
  {
    path: "/",
    name: "Root",
    component: () => import("@/layout/index.vue"),
    redirect: PageEnum.BASE_HOME,
    meta: {
      title: "root"
    },
    children: [
      {
        path: "/welcome",
        name: "welcome",
        component: () => import("@/views/welcome.vue"),
        meta: {
          title: "welcome"
        }
      }
    ]
  }
];

export default homeRouter;
