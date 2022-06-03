<script setup lang="ts">
import Card from "@/components/card/index.vue";
import { VueEcharts } from "@/components";
import EchartsOptions from "../utils/options";

defineProps({
  data: {
    type: Object,
    default: () => {
      return [];
    }
  }
});

function getOptions(item: any, index: number) {
  const res = EchartsOptions[index] || {};
  return res;
}
</script>

<template>
  <el-row :gutter="20">
    <el-col
      :xs="24"
      :sm="12"
      :md="6"
      :lg="6"
      :xl="6"
      v-for="(item, index) in data"
      :key="index"
      class="mb-2"
    >
      <div class="h-172px">
        <Card :bodyStyle="{ padding: 0, height: '100%' }">
          <VueEcharts :options="getOptions(item, index)" open />
        </Card>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped></style>
