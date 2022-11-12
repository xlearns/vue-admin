<script setup lang="ts">
import { ellipsisProps } from "./ellipsis";
const props = defineProps(ellipsisProps);

const dom = ref();

const callback = () => {
  const { show } = props.ellipsis;
  if (show) {
    setTimeout(() => {
      const el = dom.value;
      const aria = el.getAttribute("aria-describedby");
      if (!aria) return;
      const clientWidth = el.offsetWidth;
      const scrollWidth = el.scrollWidth;

      const clientHeight = el.offsetHeight;
      const scrollHeight = el.scrollHeight;
      const _ = document.querySelector(`#${aria}`);
      const _dom = _.parentNode as HTMLElement;

      if (clientWidth < scrollWidth || clientHeight < scrollHeight) {
        _dom.style.opacity = "1";
      } else {
        _dom.style.opacity = "0";
      }
    }, 5);
  }
};

const style = computed(() => {
  const { show, multi } = props.ellipsis;
  const css = {};
  if (show) {
    const attrs = [
      ["width", "100px"],
      ["whiteSpace", "nowrap"],
      ["overflow", "hidden"],
      ["textOverflow", "ellipsis"]
    ] as const;
    attrs.map(([key, value]) => {
      css[key] = props.ellipsis[key] || value;
    });
  }
  return css;
});
</script>
<template>
  <ElTooltip :effect="effect" :content="content" :placement="placement">
    <div
      class="inline-block"
      @mouseenter="callback"
      @mouseover="callback"
      ref="dom"
      :style="style"
    >
      <slot />
    </div>
  </ElTooltip>
</template>
