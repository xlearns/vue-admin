const homeRouter = [
  {
    path: "/",
    name: "home",
    // component: Layout,
    // redirect: "/welcome",
    meta: {
      icon: "home-filled",
      title: "hello",
      rank: 0
    },
    children: [
      {
        path: "/welcome",
        name: "welcome",
        component: () => import("@/views/welcome.vue"),
        meta: {
          i18n: true
        }
      }
    ]
  }
];

export default homeRouter;
