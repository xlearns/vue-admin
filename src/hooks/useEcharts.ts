import echarts from "@plugins/echarts";
import type { EChartsOption } from "echarts";
import { computed, Ref } from "vue";
import { ref, unref, nextTick } from "vue";
import {
  useEventListener,
  useDebounceFn,
  useTimeoutFn,
  tryOnUnmounted
} from "@vueuse/core";

export default function (
  elRef: Ref<HTMLDivElement>,
  theme: "light" | "dark" | "default" = "default"
) {
  const cacheOptions = ref({}) as Ref<EChartsOption>;
  let chartInstance: echarts.ECharts | null = null;

  let removeResizeFn: Fn = () => {};
  const resizeFn: Fn = useDebounceFn(resize, 200);
  function resize(): void {
    chartInstance?.resize();
  }

  function initCharts(t = theme) {
    const el = unref(elRef);
    if (!el || !unref(el)) return;
    chartInstance = echarts.init(el, t);
    const stop = useEventListener(window, "resize", resizeFn);
    removeResizeFn = stop;
  }
  const getOptions = computed(() => {
    return {
      backgroundColor: "transparent",
      ...cacheOptions.value
    } as EChartsOption;
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
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts();
          if (!chartInstance) return;
        }
        clear && chartInstance?.clear();
        chartInstance?.setOption(unref(getOptions));
      }, 30);
    });
  }
  function getInstance(): echarts.ECharts {
    if (!chartInstance) {
      initCharts();
    }
    return chartInstance;
  }

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });
  return {
    setOptions,
    resize,
    echarts,
    getInstance
  };
}
