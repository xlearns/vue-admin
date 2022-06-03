<script setup lang="ts">
import ECard from "@/components/card/index.vue";
import { useWelcome } from "@/views/welcome/src/hooks/useWelcome";
const { topData } = useWelcome();
</script>

<template>
  <div class="h-full">
    <div v-for="(item, index) in topData" :key="index">
      <ECard>hello</ECard>
    </div>
  </div>
</template>

<style scoped></style>
