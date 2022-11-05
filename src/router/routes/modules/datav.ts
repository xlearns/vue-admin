import PageEnum from "@/enums/pageEnum";
const DataVRouter = [
  {
    path: "/datav",
    name: "datavRoot",
    key: 1,
    component: () => import("@/layout/index.vue"),
    redirect: "/datav/page1",
    meta: {
      title: "datavRoot",
      icon: "cil:screen-desktop"
    },
    children: [
      {
        path: "/datav/page1",
        name: "dv1",
        component: () => import("@/views/datav/page1/index.vue"),
        meta: {
          title: "大屏1"
        }
      },
      {
        path: "/datav/page2",
        name: "dv2",
        component: () => import("@/views/datav/page2/index.vue"),
        meta: {
          title: "大屏2"
        }
      }
      // {
      //   path: "/datav/page3",
      //   name: "dv3",
      //   component: () => import("@/views/datav/page3/index.vue"),
      //   meta: {
      //     title: "大屏3"
      //   }
      // }
    ]
  }
];

export default DataVRouter;
