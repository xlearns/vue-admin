<script setup lang="ts">
import { ref, useSlots } from "vue";
import { tableProps } from "./table";
import Render from "./render";
const multipleSelection = ref<unknown[]>([]);

defineProps(tableProps);

const handleSelectionChange = (val: unknown[]) => {
  multipleSelection.value = val;
};

defineExpose({ multipleSelection });
</script>
<template>
  <ElTable
    class="w-full h-full"
    :height="height"
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
    >
      <template #header>{{ action.title || "操作" }}</template>
      <template #default="scope">
        <slot :data="scope" />
      </template>
    </ElTableColumn>
  </ElTable>
</template>
