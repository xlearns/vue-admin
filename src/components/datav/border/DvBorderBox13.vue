<template>
  <div class="dv-border-box-13" ref="dom">
    <svg class="dv-border-svg-container" :width="width" :height="height">
      <path
        :fill="backgroundColor"
        :stroke="mergedColor[0]"
        :d="`
          M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
          L ${width - 20} 10 L ${width - 5} 25
          L ${width - 5} ${height - 5} L 20 ${height - 5}
          L 5 ${height - 20} L 5 20
        `"
      />

      <path
        fill="transparent"
        stroke-width="3"
        stroke-linecap="round"
        stroke-dasharray="10, 5"
        :stroke="mergedColor[0]"
        :d="`M 16 9 L 61 9`"
      />

      <path
        fill="transparent"
        :stroke="mergedColor[1]"
        :d="`M 5 20 L 5 10 L 12 3  L 60 3 L 68 10`"
      />

      <path
        fill="transparent"
        :stroke="mergedColor[1]"
        :d="`M ${width - 5} ${height - 30} L ${width - 5} ${height - 5} L ${
          width - 30
        } ${height - 5}`"
      />
    </svg>

    <div class="border-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useDomClient } from "./hooks/useDomClient";
const props = defineProps({
  color: {
    type: Array,
    default: () => ["#235fa7", "#4fd2dd"]
  },
  backgroundColor: {
    type: String,
    default: "transparent"
  }
});

const mergedColor = ref([]);
const { dom, width, height, init } = useDomClient();

function mergeColor() {
  mergedColor.value = Object.assign([], props.backgroundColor, props.color);
}
onMounted(() => {
  init();
  mergeColor();
});
</script>
<style lang="scss" scoped>
.dv-border-box-13 {
  position: relative;
  width: 100%;
  height: 100%;

  .dv-border-svg-container {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }

  .border-box-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
