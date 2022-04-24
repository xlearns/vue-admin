import "virtual:windi.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { MotionPlugin } from "@vueuse/motion";
import { useElementPlus } from "./plugins/element-plus";
import directives from "@/directives";
const app = createApp(App);

Object.keys(directives).forEach(name => app.directive(name, directives[name]));
app.use(MotionPlugin);
app.use(createPinia());
app.use(router);
app.use(useElementPlus);
app.mount("#app");
