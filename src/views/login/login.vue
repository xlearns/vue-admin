<script setup lang="ts">
import { bg, currentWeek } from "./utils/static";
</script>
<template>
  <img :src="bg" class="fixed h-[100%] left-0 bottom-0 -z-1" />
  <div class="w-[100vw] h-[100vh] grid grid-cols-2">
    <div class="flex justify-end items-center">
      <component :is="currentWeek" />
    </div>
  </div>
</template>
