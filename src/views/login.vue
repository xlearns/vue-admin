<script setup lang="ts">
import { reactive } from "vue";
const emptyValue = reactive({
  content: "暂无列表",
  img: "https://www.baidu.com/img/bd_logo1.png",
  // img: 'import "../assets/empty.png"',
  visible: true
});
const test = function () {
  emptyValue.visible = !emptyValue.visible;
};
</script>
<template>
  <button @click="test">{{ emptyValue.visible }}</button>
  <div
    v-empty="emptyValue"
    style="border: 5px solid red; width: 100px; height: 100px"
  >
    hello world
  </div>
</template>

<style scoped></style>
