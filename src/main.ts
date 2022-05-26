import "virtual:windi.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { MotionPlugin } from "@vueuse/motion";
import { useElementPlus } from "./plugins/element-plus";
import directives from "@/directives";
// 导入公共样式
import "./style/index.scss";
import { setupRouterGuard } from "@/router/guard";
// 国际化
import { useI18n } from "./plugins/i18n";
//contentmenu
import contextmenu from "vue3-contextmenu";
import "vue3-contextmenu/dist/vue3-contextmenu.css";

const app = createApp(App);

Object.keys(directives).forEach(name => app.directive(name, directives[name]));
app.use(MotionPlugin);
app.use(createPinia());
app.use(contextmenu);
app.use(router);
setupRouterGuard(router);
app.use(useElementPlus);
app.use(useI18n);
app.mount("#app");
