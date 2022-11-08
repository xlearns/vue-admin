<script setup lang="ts">
import type { DefineComponent } from "vue";
import { h, watchEffect } from "vue";
import ReTable from "@c/table";
import ReCard from "@c/card";
import ReIcon from "@c/icon";
import ColumnSetting from "./column.vue";

const table = ref();
const loading = ref(false);
const size = ref("default");
const autoHeight = ref(true);
const headInit = [
  {
    label: "序号",
    prop: "index",
    width: 70
  },
  {
    label: "角色名称",
    prop: "name"
  },
  {
    label: "角色标识",
    prop: "code",
    render({ row }) {
      return h(
        "a",
        {
          href: "javascript:;",
          style: "text-decoration:revert",
          onClick: () => {
            console.log(1);
          }
        },
        row
      );
    }
  },
  {
    label: "角色类型",
    prop: "type"
  },
  {
    label: "显示顺序",
    prop: "sort",
    render: ({ row, column }) => {
      return h("div", { style: { color: "red" } }, row + column);
    }
  },
  {
    label: "创建时间",
    // width: 180,
    prop: "createTime",
    formatter: (val: string) => {
      return new Date(val).toLocaleString();
    }
  }
];
const headData = ref(headInit);

const action = [
  {
    name: "刷新",
    type: "function",
    icon: "ep:refresh-right",
    render: () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 500);
    }
  },
  {
    name: "密度",
    type: "dropdown",
    icon: "icons8:resize-vertical",
    dropdowns: [
      { name: "松散", val: "large" },
      { name: "默认", val: "default" },
      { name: "紧凑", val: "small" }
    ],
    render: _ => {
      const { val } = _;
      size.value = val;
    }
  },
  {
    name: "列设置",
    type: "component",
    icon: "ep:setting",
    width: 200,
    render: () => {
      return h(ColumnSetting as unknown as DefineComponent, {
        column: headData.value
      });
    }
  }
];

const tooptipDom = ref();
const tableData = Array.from({ length: 100 }, (_, i) => ({
  index: i,
  name: "John Brown",
  age: 18,
  address: "New York No. 1 Lake Park",
  date: "2016-10-03",
  code: "code",
  type: "admin",
  sort: 1,
  createTime: Date.now()
}));

function click(_) {
  console.log(_.data.row);
  alert(JSON.stringify(_.data.row));
}

watchEffect(() => {
  console.log(table.value?.multipleSelection);
});
</script>

<template>
  <div class="w-full h-full border-box">
    <ElTooltip
      placement="top"
      :virtual-ref="tooptipDom"
      virtual-triggering
      trigger="hover"
      :content="tooptipDom?.getAttribute('name')"
    />
    <ReCard showHeader>
      <template #header>
        <div class="flex justify-between">
          <div>自定义内容</div>
          <div class="flex gap-2 items-center">
            <ElButton @click="autoHeight = !autoHeight"
              >{{ autoHeight ? "取消" : "" }}自适应高度</ElButton
            >
            <template v-for="item in action" :key="item">
              <ElTooltip
                v-if="item.type == 'function'"
                effect="dark"
                :content="item.name"
                placement="top-start"
              >
                <div @click="item.render">
                  <ReIcon v-if="item.icon" :icon="item.icon" />
                  <template v-else>{{ item.name }}</template>
                </div>
              </ElTooltip>
              <ElDropdown v-else-if="item.type == 'dropdown'" trigger="click">
                <div
                  :name="item.name"
                  @mouseover="e => (tooptipDom = e.currentTarget)"
                  class="text-[16px] leading-[24px]"
                >
                  <ReIcon v-if="item.icon" :icon="item.icon" />
                  <template v-else>{{ item.name }}</template>
                </div>
                <template #dropdown>
                  <ElDropdownMenu>
                    <ElDropdownItem
                      v-for="dropdown in item.dropdowns"
                      :key="dropdown"
                      @click="item.render(dropdown)"
                      >{{ dropdown.name }}</ElDropdownItem
                    >
                  </ElDropdownMenu>
                </template>
              </ElDropdown>
              <ElPopover
                v-else-if="item.type == 'component'"
                :popper-options="{
                  placement: 'bottom'
                }"
                :width="item.width || 150"
                trigger="click"
              >
                <template #reference>
                  <div
                    :name="item.name"
                    @mouseover="e => (tooptipDom = e.currentTarget)"
                  >
                    <ReIcon v-if="item.icon" :icon="item.icon" class="" />
                    <template v-else>{{ item.name }}</template>
                  </div>
                </template>
                <component :is="item.render" />
              </ElPopover>
            </template>
          </div>
        </div>
      </template>
      <ReTable
        :size="size"
        :loading="loading"
        :tableData="tableData"
        :headData="headData"
        :selection="true"
        ref="table"
        :height="autoHeight ? 'calc(100vh - 238px)' : '100%'"
      >
        <template v-slot="data">
          <el-button type="primary" @click="click(data)"> 修改 </el-button>
        </template>
      </ReTable>
    </ReCard>
  </div>
</template>
