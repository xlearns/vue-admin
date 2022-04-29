// 获取所有modules下的ts文件
const modules = import.meta.globEager("./modules/**/*.ts");

const routeModuleList = [];

Object.keys(modules).forEach(key => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const basicRoutes = [];
