<script setup lang="ts">
import Card from "@/components/card/index.vue";
import EchartsOptions from "@/views/welcome/src/utils/options";
import { VueEcharts } from "@/components";
function getOptions(index) {
  return EchartsOptions[index];
}
</script>

<template>
  <div class="h-400px">
    <Card
      :bodyStyle="{
        padding: 0,
        height: '100%'
      }"
    >
      <VueEcharts :options="getOptions(0)" open />
    </Card>
    <Card
      class="mt-8px"
      :bodyStyle="{
        padding: 0,
        height: '100%'
      }"
    >
      <VueEcharts :options="getOptions(2)" open />
    </Card>
  </div>
</template>

<style scoped></style>
