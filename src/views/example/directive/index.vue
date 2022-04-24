<script setup lang="ts">
import { reactive } from "vue";
const emptyValue = reactive({
  content: "暂无列表",
  img: "https://www.baidu.com/img/bd_logo1.png",
  // img: 'import "../assets/empty.png"',
  visible: true
});
</script>
<template>
  <div style="width: 10px" v-ellipsis:20>hello world</div>
  <div style="position: relative">
    <div v-drag style="background: red">{{ emptyValue.visible }}</div>
  </div>
  <div style="position: relative">
    <div v-empty="emptyValue">hello world</div>
  </div>
</template>

<style scoped></style>
