import { computed } from "vue";
import { useAppStore } from "@/stores/modules/app";

const appStore = useAppStore();
const getMenuWidth = computed(() => {
  return appStore.getMenuWidth + "px";
});
const getNavColor = computed(() => {
  return appStore.getNavColor;
});
const setNavColor = (item: { bg: string; text: string }) => {
  appStore.setNavColor(item);
};
const setMenuCollapse = (item: boolean) => {
  appStore.setMenuCollapse(item);
};
const getMenuCollapse = computed(() => {
  return appStore.getMenuCollapse;
});
export const useMenuSetting = function () {
  return {
    getMenuCollapse,
    setMenuCollapse,
    setNavColor,
    getNavColor,
    getMenuWidth
  };
};
