import echarts from "@plugins/echarts";
import type { EChartsOption } from "echarts";
import { computed, Ref } from "vue";
import { ref, unref, nextTick } from "vue";
import { useEventListener, useDebounceFn, useTimeoutFn } from "@vueuse/core";

export default function (
  elRef: Ref<HTMLDivElement>,
  theme: "light" | "dark" | "default" = "default"
) {
  const cacheOptions = ref({}) as Ref<EChartsOption>;
  let chartInstance: echarts.ECharts | null = null;
  const resizeFn: Fn = useDebounceFn(resize, 200);
  function resize(): void {
    chartInstance?.resize();
  }

  function initCharts(t = theme) {
    const el = unref(elRef);
    if (!el || !unref(el)) return;
    chartInstance = echarts.init(el, t);
    useEventListener(window, "resize", resizeFn);
  }
  const getOptions = computed(() => {
    return { backgroundColor: "transparent", ...cacheOptions } as EChartsOption;
  });
  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options;
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions));
      }, 30);
      return;
    }
    nextTick(() => {
      if (!chartInstance) {
        initCharts();
        if (!chartInstance) return;
      }
      clear && chartInstance?.clear();
      chartInstance?.setOption(unref(getOptions));
    });
  }
  function getInstance(): echarts.ECharts {
    return chartInstance;
  }
  return {
    setOptions,
    resize,
    echarts,
    getInstance
  };
}
