import { defineStore } from "pinia";
import { store } from "@/stores";
import { useStorage } from "@vueuse/core";
import { PROJ_CFG_KEY } from "@/enums/cacheEnum";
import { menuSetting } from "@/settings/projectSetting";

const ms = useStorage(PROJ_CFG_KEY, menuSetting);

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    getProjectConfig: ms
  }),
  getters: {
    getMenuSetting() {
      return this.getProjectConfig;
    },
    getMenuWidth() {
      return this.getMenuSetting.menuWidth;
    },
    getNavColor() {
      return this.getMenuSetting.navColor;
    },
    getMenuCollapse() {
      return this.getMenuSetting.menuCollapse;
    }
  },
  actions: {
    setMenuWidth(val: number) {
      ms.value.menuWidth = val;
    },
    setMenuCollapse(obj: boolean) {
      ms.value.menuCollapse = obj;
    },
    setNavColor(obj: { bg: string; text: string }) {
      ms.value.navColor = obj;
    }
  }
});
