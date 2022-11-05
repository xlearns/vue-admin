import { ref, onMounted } from "vue";
import { useStorage } from "@vueuse/core";
import { toggleTheme } from "@zougt/vite-plugin-theme-preprocessor/dist/browser-utils";

const themeColors = ref([
  // 道奇蓝（默认）
  { color: "#1b2a47", themeColor: "default" },
  // 亮白色
  { color: "#ffffff", themeColor: "light" },
  // 猩红色
  { color: "#f5222d", themeColor: "dusk" },
  // 橙红色
  { color: "#fa541c", themeColor: "volcano" },
  // 金色
  { color: "#fadb14", themeColor: "yellow" },
  // 绿宝石
  { color: "#13c2c2", themeColor: "mingQing" },
  // 酸橙绿
  { color: "#52c41a", themeColor: "auroraGreen" },
  // 深粉色
  { color: "#eb2f96", themeColor: "pink" },
  // 深紫罗兰色
  { color: "#722ed1", themeColor: "saucePurple" }
]);

// 系统主题
const systemTheme = useStorage("systemTheme", "default");

// 菜单主题
const menuTheme = useStorage("menuTheme", "default");

// 顶栏主题
const headerTheme = useStorage("headerTheme", "default");

// 导航栏模式
const navTheme = useStorage("navTheme", 0);

function myToggleTheme(themeType) {
  toggleTheme({ scopeName: `theme-${themeType}` });
}

export const useTheme = () => {
  function clear() {
    systemTheme.value = "default";
    menuTheme.value = "default";
    headerTheme.value = "default";
    navTheme.value = 0;
  }
  function changeNavTheme(num: number) {
    navTheme.value = num;
  }
  return {
    clear,
    myToggleTheme,
    changeNavTheme,
    themeColors,
    systemTheme,
    menuTheme,
    headerTheme,
    navTheme
  };
};
