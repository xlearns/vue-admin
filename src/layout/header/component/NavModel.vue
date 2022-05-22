<script setup lang="ts">
import { ref } from "vue";
import { NavModel } from "../utils/enums";
import { useTheme } from "@/hooks/useTheme";

let { changeNavTheme, navTheme } = useTheme();

let model = ref(navTheme.value);
function changeModel(index: number) {
  model.value = index;
  changeNavTheme(index);
}
</script>

<template>
  <div class="flex justify-around">
    <el-tooltip
      v-for="(item, index) in NavModel"
      :key="index"
      effect="dark"
      placement="bottom"
      :content="item.title"
    >
      <div
        @click="changeModel(index)"
        :class="{ 'border-[#409eff]': index == model }"
        class="h-45px w-[18%] bg-[#f0f2f5] relative cursor-pointer border-2"
      >
        <div :class="item.class1"></div>
        <div :class="item.class2"></div>
      </div>
    </el-tooltip>
  </div>
</template>

<style scoped></style>
