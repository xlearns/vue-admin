const homeRouter = [
  {
    path: "/welcome",
    name: "welcome",
    component: () => import("@/views/welcome.vue"),
    meta: {
      icon: "home-filled",
      title: "hello",
      rank: 0
      // roles: ["super"]
    }
    // children: [
    //   {
    //     path: "/welcome",
    //     name: "welcome",
    //     component: () => import("@/views/welcome.vue")
    //   }
    // ]
  }
];

export default homeRouter;
