<script setup lang="ts"></script>

<template>
  <div class="title">
    <div class="flex justify-center items-center h-[60px]"><slot></slot></div>
  </div>
</template>

<style scoped lang="scss">
.title {
  height: 60px;
  background: url("@/assets/datav/title1.png") no-repeat center center/100%;
}
</style>
