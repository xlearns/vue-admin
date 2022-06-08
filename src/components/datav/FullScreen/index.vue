<template>
  <div
    ref="dom"
    class="datav-full-sreen"
    :style="{
      position: options.position || 'fixed',
      top: options.top || 0,
      left: options.left || 0,
      bottom: options.bottom || 0,
      right: options.right || 0,
      width: options.width || 1920,
      height: options.height || 1080,
      zIndex: options.zIndex || 999
    }"
  >
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, nextTick, onUnmounted, watch } from "vue";
import { debounce } from "@/utils";
export default {
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: 1920,
          height: 1080
        };
      }
    }
  },
  setup(props) {
    let dom = ref();
    let width = ref(0);
    let height = ref(0);
    let originalWidth = ref(0);
    let originalHeight = ref(0);
    let ready = ref(false);
    let observer;
    const updateScale = function () {
      // 获取真实的视口尺寸
      const currentWidth = props.options.w || document.body.clientWidth;
      const currentHeight = props.options.h || document.body.clientHeight;
      // 获取大屏最终的宽高
      const realWidth = width.value || originalWidth.value;
      const realHeight = height.value || originalHeight.value;
      const widthScale = currentWidth / realWidth;
      const heightScale = currentHeight / realHeight;
      dom.value &&
        (dom.value.style.transform = `scale(${widthScale}, ${heightScale})`);
    };
    const updateSize = function () {
      if (width.value && height.value) {
        dom.value.style.width = `${width.value}px`;
        dom.value.style.height = `${height.value}px`;
      } else {
        dom.value.style.width = `${originalWidth.value}px`;
        dom.value.style.height = `${originalHeight.value}px`;
      }
    };
    const init = function () {
      return new Promise((resolve: Fn) => {
        nextTick(() => {
          if (props.options && props.options.width && props.options.height) {
            width.value = props.options.width;
            height.value = props.options.height;
          } else {
            console.warn(
              "props.options.width||props.options.height no defined"
            );
            width.value = dom.value.clientWidth;
            height.value = dom.value.clientHeight;
          }
          // 视口宽度
          if (!originalWidth.value || !originalHeight.value) {
            originalWidth.value = window.screen.width;
            originalHeight.value = window.screen.height;
          }
          resolve();
        });
      });
    };

    const onResize = async function () {
      // 屏幕改变、分辨率改变都会触发
      await init();
      updateScale();
    };

    watch(
      () => props.options.w,
      () => {
        onResize();
      }
    );

    const initMutationObserver = function () {
      const MutationObserver = window.MutationObserver;
      // dom变化执行onResize【callback】
      observer = new MutationObserver(onResize);
      observer.observe(dom.value, {
        attributes: true,
        attributeFilter: ["style"],
        attributeOldValue: true
      });
    };
    const removeMutationObserver = function () {
      if (observer) {
        observer.disconnect();
        observer.takeRecords();
        observer = null;
      }
    };

    onMounted(async () => {
      ready.value = false;
      await init();
      updateSize();
      updateScale();
      window.addEventListener("resize", debounce(100, onResize));
      initMutationObserver();
      ready.value = true;
    });

    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
      removeMutationObserver();
    });

    return {
      onResize,
      ready,
      dom
    };
  }
};
</script>

<style lang="scss" scoped>
.datav-full-sreen {
  overflow: hidden;
  transform-origin: left top;
}
</style>
