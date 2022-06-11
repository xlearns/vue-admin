<script setup lang="ts">
import { ref, watchEffect, watch } from "vue";
import { FullScreen } from "@/components/datav";
import { Card, Title } from "./src/components";
import { useMainElement } from "@/hooks/useMainElement";
import { useMenuSetting } from "@/hooks/useMenuSetting";
import { leftData, rightData, centerData } from "./src/utils/options";
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
        <Title>
          <span class="title-text">互联网设备可视化平台</span>
        </Title>
        <div class="content flex justify-between px-10">
          <div class="left flex flex-col justify-around h-full">
            <Card
              :width="item.w"
              :height="item.h"
              v-for="(item, index) in leftData"
              :key="index"
              :title="item.title"
            >
              <VueEcharts
                :options="getOptions(index)"
                open
                :animation="{ open: true }"
              />
            </Card>
          </div>
          <div class="center felx-1 flex flex-col justify-around h-full">
            <div class="h-[25px] text-[#fff]"></div>
            <Card
              :width="item.w"
              :height="item.h"
              v-for="(item, index) in centerData"
              :key="index"
              :title="item.title"
            >
              <VueEcharts
                :options="getOptions(index == 0 ? 4 : index)"
                open
                :animation="{ open: true }"
              />
            </Card>
          </div>
          <div class="left flex flex-col justify-around h-full">
            <Card
              :width="item.w"
              :height="item.h"
              v-for="(item, index) in rightData"
              :key="index"
              :title="item.title"
            >
              <VueEcharts
                :options="getOptions(index + 1)"
                open
                :animation="{ open: true }"
              />
            </Card>
          </div>
        </div>
      </div>
    </FullScreen>
  </div>
</template>

<style scoped>
.bg {
  background: url("@/assets/datav/bg1.png") no-repeat center center/100%;
}

.content {
  height: calc(100% - 60px);
}

.title-text {
  font-size: 38px;
  font-weight: 900;
  background: linear-gradient(92deg, #0072ff, #00eaff 48.85254%, #01aaff);
  -webkit-background-clip: text;
  letter-spacing: 6px;
  -webkit-text-fill-color: transparent;
}
</style>
