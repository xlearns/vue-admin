<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import Echarts from "@plugins/echarts";

const props = defineProps({
  options: Object,
  theme: {
    type: [Object, String],
    default: ""
  },
  open: {
    type: Boolean,
    default: false
  },
  type: {
    type: Object,
    default: () => {
      return {
        renderer: "canvas"
      };
    }
  },
  animation: {
    type: Object
  }
});

let dom = ref();
let charts = null;
let dataIndex = -1;
let timerObj = null;
let defaultAnimationConfig = {
  open: false,
  time: 3000,
  highlight: true,
  showTip: false
};
watch(
  () => props.options,
  () => {
    charts?.setOption(props.options);
  },
  {
    deep: true
  }
);
const onResize = function () {
  charts?.resize();
};
const ani = function (timer) {
  timerObj = setInterval(() => {
    charts?.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex
    });
    dataIndex = (dataIndex + 1) % props.options.series[0].data.length;
    if (defaultAnimationConfig.highlight) {
      charts?.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex
      });
    }
    if (defaultAnimationConfig.showTip) {
      charts?.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex
      });
    }
  }, timer);
};
onMounted(() => {
  let _dom = dom.value;
  if (!props.open) {
    _dom.style.height = "150px";
    _dom.style.width = "300px";
  } else {
    _dom.style.height = "100%";
    _dom.style.width = "100%";
  }
  charts = Echarts.init(_dom, props.theme, props.type);
  charts.setOption(props.options);
  window.addEventListener("resize", onResize);
  Object.assign(defaultAnimationConfig, props.animation);
  if (defaultAnimationConfig.open) {
    ani(defaultAnimationConfig.time);
  }
});
onUnmounted(() => {
  clearInterval(timerObj);
  window.removeEventListener("resize", onResize);
});
</script>

<template>
  <div class="echats" ref="dom"></div>
</template>
