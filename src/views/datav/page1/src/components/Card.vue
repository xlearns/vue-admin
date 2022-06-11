<script setup lang="ts">
import { ref, computed } from "vue";
import { DvBorderBox13 } from "@/components/datav";

const props = defineProps({
  width: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: ""
  }
});

const dom_title = ref();

const cumStyle = computed(() => {
  let theight = dom_title.value?.clientHeight || 0;
  return props.height - theight - 32 + "px";
});
</script>

<template>
  <div :style="{ width: `${width}px`, height: `${height}px` }">
    <DvBorderBox13>
      <div class="py-16px pl-6px pr-0">
        <div
          class="title flex justify-center h-[38px] items-center"
          v-if="title"
          ref="dom_title"
        >
          <img src="@/assets/datav/left.png" />
          <span class="title-text">
            {{ title }}
          </span>
          <img class="transform rotate-180" src="@/assets/datav/left.png" />
        </div>
        <div
          :style="{
            height: cumStyle
          }"
        >
          <slot></slot>
        </div>
      </div>
    </DvBorderBox13>
  </div>
</template>

<style scoped>
.title-text {
  font-weight: 900;
  letter-spacing: 2px;
  background: linear-gradient(92deg, #0072ff, #00eaff 48.85254%, #01aaff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
