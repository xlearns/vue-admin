import PageEnum from "@/enums/pageEnum";
const DataVRouter = [
  {
    path: "/datav",
    name: "datavRoot",
    component: () => import("@/layout/index.vue"),
    redirect: "/datav/index",
    meta: {
      title: "datavRoot",
      icon: "cil:screen-desktop"
    },
    children: [
      {
        path: "/datav/index",
        name: "datav",
        component: () => import("@/views/datav/index.vue"),
        meta: {
          title: "datav"
        }
      }
    ]
  }
];

export default DataVRouter;
