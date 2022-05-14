const mustRouter = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      title: "login",
      showLink: false,
      rank: 101
    }
  },
  {
    path: "/redirect",
    // component: Layout,
    meta: {
      icon: "home-filled",
      title: "redirect",
      // i18n: true,
      showLink: false,
      rank: 104
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "redirect"
        // component: () => import("/@/layout/redirect.vue")
      }
    ]
  }
];

export default mustRouter;
