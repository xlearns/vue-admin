const GameRouter = [
  {
    path: "/games",
    name: "gamesRoot",
    key: 2,
    component: () => import("@/layout/index.vue"),
    redirect: "/games/vertical",
    meta: {
      title: "gamesRoot",
      icon: "icon-park-outline:game-three"
    },
    children: [
      {
        path: "/games/vertical",
        name: "verticalPlatform",
        component: () => import("@/views/game/vertical/index.vue"),
        meta: {
          title: "垂直平台"
        }
      }
    ]
  }
];

export default GameRouter;
