import { computed } from "vue";
import { useAppStore } from "@/stores/modules/app";

const appStore = useAppStore();
const getMenuWidth = computed(() => {
  return appStore.getMenuWidth + "px";
});
export const useMenuSetting = function () {
  return {
    getMenuWidth
  };
};
