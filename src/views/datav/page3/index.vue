<script setup lang="ts">
import { ref, watchEffect, watch } from "vue";
import { FullScreen, Border } from "@/components/datav";
import { useMainElement } from "@/hooks/useMainElement";
import { useMenuSetting } from "@/hooks/useMenuSetting";

import EchartsOptions from "@/views/welcome/src/utils/options";
import { VueEcharts } from "@/components";
import "echarts-map-chinajs";

const { width, height } = useMainElement();
const { getMenuCollapse } = useMenuSetting();
const dom = ref();
const w = ref(0);
const h = ref(0);
watchEffect(() => {
  w.value = width.value;
  h.value = height.value;
});
watch(
  () => getMenuCollapse.value,
  () => {
    dom.value?.onResize();
  }
);

function getOptions(index: number) {
  const res = EchartsOptions[index] || {};
  return res;
}
</script>

<template>
  <div class="h-0">
    <FullScreen
      ref="dom"
      :options="{
        w: w,
        h: h,
        zIndex: '0',
        width: 1920,
        height: 1080,
        position: 'absolute'
      }"
    >
      <div class="h-full bg">
        <div class="flex p-5">
          <div>
            <div
              class="w-[330px] h-[330px] mb-20px"
              v-for="item in 3"
              :key="item"
            >
              <Border>
                <VueEcharts
                  :options="getOptions(0)"
                  open
                  :animation="{ open: true }"
                />
              </Border>
            </div>
          </div>
          <div class="flex-1">
            <div class="text-center text-[#fff] text-8xl">数据大屏</div>
            <div class="h-[80%]">
              <VueEcharts
                :options="getOptions(4)"
                open
                :animation="{ open: true, showTip: true }"
              />
            </div>
          </div>
          <div>
            <div
              class="w-[330px] h-[330px] mb-20px"
              v-for="item in 3"
              :key="item"
            >
              <Border>
                <VueEcharts
                  :options="getOptions(3)"
                  open
                  :animation="{ open: true }"
                />
              </Border>
            </div>
          </div>
        </div>
      </div>
    </FullScreen>
  </div>
</template>

<style scoped>
.bg {
  background: url("@/assets/datav/bg.png") no-repeat center center/100%;
}
</style>
