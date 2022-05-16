import { RoleEnum } from "@/enums/roleEnum";
const homeRouter = [
  {
    path: "/welcome",
    name: "welcome",
    component: () => import("@/views/welcome.vue"),
    meta: {
      title: "hello",
      roles: [RoleEnum.SUPER]
    },
    children: [
      {
        path: "test",
        name: "test",
        component: () => import("@/views/test.vue")
      }
    ]
  }
];

export default homeRouter;
