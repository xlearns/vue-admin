export default [
  {
    path: "/tabs",
    redirect: "/tabs/index",
    meta: {
      icon: "IF-team-icontabs",
      title: "menus.hstabs",
      i18n: true,
      rank: 13
    },
    children: [
      {
        path: "/tabs/index",
        name: "reTabs",
        meta: {
          title: "menus.hstabs",
          i18n: true
        }
      },
      {
        path: "/tabs/detail",
        name: "tabDetail",
        meta: {
          title: "",
          showLink: false,
          i18n: false,
          dynamicLevel: 3,
          refreshRedirect: "/tabs/index"
        }
      }
    ]
  }
];
