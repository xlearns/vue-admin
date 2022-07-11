<script setup lang="ts">
import { Icon } from "@iconify/vue";
interface props {
  data: any[];
  columns: any[];
}
const iconAttr = [
  "bx:refresh",
  "ant-design:column-height-outlined",
  "ep:setting"
];
const attrs = useAttrs();
const { columns } = defineProps<props>();
const column = ref(columns);
const buttonRef = ref();
const popoverRef = ref();
const tableSize = ref("large");
function change(val, index) {
  column.value[index].hide = val;
}
function changeSize(val) {
  tableSize.value = val;
}

const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};

watchEffect(() => {
  column.value = columns.map(v => {
    return {
      hide: true,
      ...v
    };
  });
});
</script>

<template>
  <div class="title">
    <div class="flex justify-end">
      <div
        v-for="(i, num) in iconAttr"
        :class="`w-[24px] h-[24px] my-[12px] cursor-pointer ${
          num < iconAttr.length - 1 ? 'mr-[12px]' : ''
        } `"
        :key="i"
      >
        <el-popover
          placement="bottom"
          :width="400"
          trigger="click"
          v-if="num == iconAttr.length - 1"
        >
          <template #reference>
            <div><Icon width="100%" height="100%" :icon="i" /></div>
          </template>

          <ElCheckbox
            class="w-full"
            @change="val => change(val, index)"
            v-for="(col, index) in column"
            :key="col"
            :label="col.label"
            size="large"
            v-model="col.hide"
          />
        </el-popover>

        <ElDropdown v-else-if="num == 1" trigger="click">
          <Icon width="100%" height="100%" :icon="i" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="({ val, name }, sizeIndex) in [
                  { val: 'large', name: '松散' },
                  { val: 'default', name: '默认' },
                  { val: 'small', name: '紧凑' }
                ]"
                :key="sizeIndex"
                @click="changeSize(val)"
                >{{ name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </ElDropdown>

        <Icon width="100%" height="100%" :icon="i" v-else />
      </div>
    </div>
  </div>
  <ElTable :data="data" tyle="width: 100%" :="attrs" :size="tableSize">
    <template v-for="col in column" :key="col">
      <ElTableColumn
        v-if="col.hide"
        :type="col.type"
        :prop="col.prop"
        :label="col.label"
        :fixed="col.fixed || false"
        :width="col.width || 'auto'"
      >
        <slot v-if="col.slot" :name="col.slot"></slot>
      </ElTableColumn>
    </template>
  </ElTable>
  <!-- <ElPagination :="attrs" @currentChange="handleCurrentChange" /> -->
</template>

<style lang="scss" scoped>
@use "@/style/component/table";
</style>
