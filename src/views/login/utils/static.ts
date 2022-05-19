import { computed } from "vue";
import bg from "@/assets/login/bg.png";

import illustration0 from "@/assets/login/illustration0.svg";
import illustration1 from "@/assets/login/illustration1.svg";
import illustration2 from "@/assets/login/illustration2.svg";
import illustration3 from "@/assets/login/illustration3.svg";
import illustration4 from "@/assets/login/illustration4.svg";
import illustration5 from "@/assets/login/illustration5.svg";
import illustration6 from "@/assets/login/illustration6.svg";

const currentWeek = computed(() => {
  switch (String(new Date().getDay())) {
    case "0":
      return illustration0;
    case "1":
      return illustration1;
    case "2":
      return illustration2;
    case "3":
      return illustration3;
    case "4":
      return illustration4;
    case "5":
      return illustration5;
    case "6":
      return illustration6;
    default:
      return illustration4;
  }
});

export { bg, currentWeek };
