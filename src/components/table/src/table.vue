<script setup lang="ts">
import { ref, useSlots, watchEffect } from "vue";
import { tableProps } from "./table";
import nProgress from "@/utils/progress";
import Render from "./render";
const multipleSelection = ref<unknown[]>([]);

const props = defineProps(tableProps);

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

const handleSelectionChange = (val: unknown[]) => {
  multipleSelection.value = val;
};

watchEffect(() => {
  if (props.loading) {
    nProgress.start();
  } else {
    nProgress.done();
  }
});
defineExpose({ multipleSelection });
</script>
<template>
  <ElTable
    class="w-full h-full"
    :size="size"
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    :max-height="height"
    :data="tableData"
    :cell-style="cellStyle"
    :row-style="rowState"
    :header-cell-style="headercellStyle"
    :header-row-style="c => cellStyle(c, true)"
    @selection-change="handleSelectionChange"
  >
    <ElTableColumn type="selection" width="55" v-if="selection" />
    <ElTableColumn
      v-for="(item, index) in headData"
      :align="item.align || 'center'"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
    >
      <template #default="scope">
        <span v-if="item.render">
          <Render
            :row="scope.row[item.prop]"
            :column="item.prop"
            :render="item.render"
          />
        </span>
        <span v-else-if="item.formatter">
          {{ item.formatter(scope.row[item.prop]) }}
        </span>
        <span v-else>{{ scope.row[item.prop] }}</span>
      </template>
    </ElTableColumn>
    <ElTableColumn
      v-if="useSlots().default"
      :align="action.align || 'center'"
      :width="action.width"
      fixed="right"
    >
      <template #header>{{ action.title || "操作" }}</template>
      <template #default="scope">
        <div class="el-table-col-action">
          <slot :data="scope" />
        </div>
      </template>
    </ElTableColumn>
  </ElTable>
</template>
