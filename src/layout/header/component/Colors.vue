<script setup lang="ts">
import Check from "@/assets/svg/check.svg";
import { useMenuSetting } from "@/hooks/useMenuSetting";
import { useTheme } from "@/hooks/useTheme";
import { ref } from "vue";
import { colors } from "../utils/enums";
const { myToggleTheme } = useTheme();
const { getNavColor, setNavColor } = useMenuSetting();
function getCurIndex(data, target) {
  let res = 0;
  data.forEach((v, i) => {
    if (v.bg == target.bg) {
      res = i;
    }
  });
  return res;
}
const cur = ref(getCurIndex(colors, getNavColor.value));

function changeColor(
  index: number,
  item: { bg: string; text: string; key: string }
) {
  cur.value = index;
  setNavColor(item);
  myToggleTheme(item.key);
}
</script>

<template>
  <div class="flex justify-around">
    <div
      class="w-17px h-17px cursor-pointer border-1"
      :style="{ backgroundColor: item.bg }"
      v-for="(item, index) in colors"
      :key="index"
      @click="changeColor(index, item)"
    >
      <Check :style="{ color: item.text }" v-if="cur == index" />
    </div>
  </div>
</template>

<style scoped></style>
