<script setup lang="ts">
let test = ref("hello");
</script>

<template>
  <div class="test">
    {{ test }}
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/component/table";
</style>
