import { computed, watch } from "vue";
import { useAppStore } from "@/stores/modules/app";
import { useWindowSize } from "@vueuse/core";
import { useDarkModel } from "./useDarkModel";
import { colors } from "@/layout/header/utils/enums";
import { useTheme } from "./useTheme";

const { width, height } = useWindowSize();
const { isDark } = useDarkModel();
const { myToggleTheme } = useTheme();

const appStore = useAppStore();
const getMenuWidth = computed(() => {
  return appStore.getMenuWidth + "px";
});
const getNavColor = computed(() => {
  return isDark.value ? colors[1] : appStore.getNavColor;
});

const getSiderShow = computed(() => {
  return appStore.getSiderShow;
});
const setSiderShow = (item: boolean) => {
  appStore.setSiderShow(item);
};
const setNavColor = (item: { bg: string; text: string; key: string }) => {
  appStore.setNavColor(item);
};
const setMenuCollapse = (item: boolean) => {
  appStore.setMenuCollapse(item);
};
const getMenuCollapse = computed(() => {
  return appStore.getMenuCollapse;
});
const getSiderHidden = computed(() => {
  return appStore.getMenuCollapse;
});
const isMinScreen = computed(() => {
  return width.value < 760;
});
const isMidScreen = computed(() => {
  return width.value > 760 && width.value < 990;
});
const isMaxScreen = computed(() => {
  return width.value > 990;
});
watch(
  () => width.value,
  () => {
    /** width app-wrapper类容器宽度
     * 0 < width <= 760 隐藏侧边栏
     * 760 < width <= 990 折叠侧边栏
     * width > 990 展开侧边栏
     */
    if (width.value <= 760 && getSiderShow.value) {
      setSiderShow(false);
    } else if (width.value > 760) {
      setSiderShow(true);
    }
    if (width.value > 760 && width.value <= 990 && !getMenuCollapse.value) {
      setMenuCollapse(true);
    } else if (width.value > 990 && getMenuCollapse.value) {
      setMenuCollapse(false);
    }
  },
  {
    immediate: true
  }
);

function initTheme() {
  if (isDark.value) {
    myToggleTheme("while");
  } else {
    let { key } = getNavColor.value;
    key = key || "default";
    myToggleTheme(key);
  }
}
export const useMenuSetting = function () {
  return {
    initTheme,
    width,
    height,
    isMinScreen,
    isMidScreen,
    isMaxScreen,
    getSiderShow,
    getMenuCollapse,
    setMenuCollapse,
    setNavColor,
    getNavColor,
    getMenuWidth
  };
};
