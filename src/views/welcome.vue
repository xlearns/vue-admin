<script setup lang="ts">
import ECard from "@/views/welcome/src/components/ECard.vue";
import DCard from "@/views/welcome/src/components/DCard.vue";
import Center from "@/views/welcome/src/components/Center.vue";
import { useWelcome } from "@/views/welcome/src/hooks/useWelcome";

const { topData } = useWelcome();
</script>

<template>
  <div class="h-full">
    <ECard :data="topData" />
    <DCard :data="topData" />
    <Center />
  </div>
</template>

<style scoped></style>
