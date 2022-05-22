import { watchEffect } from "vue";
import { useDark, useToggle } from "@vueuse/core";

const body = document.documentElement as HTMLElement;
const isDark = useDark();
const toggleDark = useToggle(isDark);
watchEffect(() => {
  if (isDark.value) {
    body.setAttribute("data-theme", "dark");
  } else {
    body.setAttribute("data-theme", "");
  }
});

export const useDarkModel = function () {
  function change() {
    toggleDark();
  }
  return {
    isDark,
    change
  };
};
