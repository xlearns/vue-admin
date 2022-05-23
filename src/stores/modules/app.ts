import { defineStore } from "pinia";
import { store } from "@/stores";
import { useStorage } from "@vueuse/core";
import { PROJ_CFG_KEY } from "@/enums/cacheEnum";
import * as project from "@/settings/projectSetting";

const data = useStorage(PROJ_CFG_KEY, { ...project });

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    getProjectConfig: data
  }),
  getters: {
    getSiderSetting() {
      return this.getProjectConfig.sider;
    },
    getMenuSetting() {
      return this.getProjectConfig.menuSetting;
    },
    getSiderShow() {
      return this.getSiderSetting.show;
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
    setMenu(key: string, val: any) {
      data.value.menuSetting[key] = val;
    },
    setSider(key: string, val: any) {
      data.value.sider[key] = val;
    },
    setMenuWidth(val: number) {
      this.setMenu("menuWidth", val);
    },
    setMenuCollapse(obj: boolean) {
      this.setMenu("menuCollapse", obj);
    },
    setNavColor(obj: { bg: string; text: string }) {
      this.setMenu("navColor", obj);
    },
    setSiderShow(obj: boolean) {
      this.setSider("show", obj);
    }
  }
});
