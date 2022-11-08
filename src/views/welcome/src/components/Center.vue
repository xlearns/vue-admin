<script setup lang="ts">
import Card from "@c/card";
import EchartsOptions from "@/views/welcome/src/utils/options";
import { VueEcharts } from "@/components";
function getOptions(index) {
  return EchartsOptions[index];
}
</script>

<template>
  <div class="h-800px flex flex-col gap-[8px]">
    <div v-for="item in [0, 2]" :key="item" class="flex-1">
      <Card
        :bodyStyle="{
          padding: 0,
          height: '100%'
        }"
      >
        <VueEcharts :options="getOptions(item)" open />
      </Card>
    </div>
  </div>
</template>
