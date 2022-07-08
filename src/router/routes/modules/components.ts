import PageEnum from "@/enums/pageEnum";
const ComponentsRouter = [
  {
    path: "/components",
    name: "componentsRoot",
    key: 2,
    component: () => import("@/layout/index.vue"),
    redirect: "/components/video",
    meta: {
      title: "componentsRoot",
      icon: "radix-icons:component-2"
    },
    children: [
      {
        path: "/components/video",
        name: "cpvideo",
        component: () => import("@/views/components/video/index.vue"),
        meta: {
          title: "视频组件"
        }
      },
      {
        path: "/components/scroll",
        name: "cpscroll",
        component: () => import("@/views/components/seamlessScroll/index.vue"),
        meta: {
          title: "滚动组件"
        }
      },
      {
        path: "/components/table",
        name: "cptable",
        component: () => import("@/views/components/table/index.vue"),
        meta: {
          title: "表格组件"
        }
      }
    ]
  }
];

export default ComponentsRouter;
