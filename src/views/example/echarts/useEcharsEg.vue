<script setup lang="ts">
import { ref } from "vue";
import useEcharts from "@hooks/useEcharts";
import bar from "./bar.json";
import type { EChartsOption } from "echarts";
let dom = ref();
let { setOptions } = useEcharts(dom);

setInterval(() => {
  bar.series[0].data = bar.series[0].data.map(() => Math.random() * 100);
  setOptions(bar as EChartsOption, false);
}, 1000);
</script>
<template>
  login
  <div ref="dom" class="div"></div>
</template>

<style scoped>
.div {
  width: 300px;
  height: 150px;
}
</style>
