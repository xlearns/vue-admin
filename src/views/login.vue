<script setup lang="ts">
import { ref } from "vue";
import useEcharts from "@hooks/useEcharts";

let dom = ref();
let { setOptions } = useEcharts(dom);
setOptions({
  title: {
    text: "ECharts 入门示例"
  },
  tooltip: {},
  legend: {
    data: ["销量"]
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});
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
