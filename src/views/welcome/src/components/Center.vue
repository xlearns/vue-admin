<script setup lang="ts">
import Card from "@/components/card/index.vue";
import EchartsOptions from "@/views/welcome/src/utils/options";
import { VueEcharts } from "@/components";
function getOptions() {
  return EchartsOptions[0];
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
      <VueEcharts :options="getOptions()" open />
    </Card>
  </div>
</template>

<style scoped></style>
