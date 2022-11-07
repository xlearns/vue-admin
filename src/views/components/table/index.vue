<script setup lang="ts">
import { h, ref, watchEffect } from "vue";
import ReTable from "@c/table";
import ReCard from "@c/card";
const table = ref();
const loading = ref(false);
const action = [
  {
    name: "刷新",
    type: "function",
    icon: "",
    render: () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 500);
    }
  },
  {
    name: "密度",
    type: "component",
    icon: "",
    render: () => {
      return h("div", { style: { color: "red" } }, 1);
    }
  },
  {
    name: "列设置",
    type: "component",
    icon: "",
    width: 200,
    render: () => {
      return h("div", { style: { color: "blue" } }, 1);
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

const columns = [
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
    width: 180,
    prop: "createTime",
    formatter: (val: string) => {
      return new Date(val).toLocaleString();
    }
  }
];

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
    <el-tooltip
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
          <div class="flex gap-1">
            <template v-for="item in action" :key="item">
              <ElTooltip
                v-if="item.type == 'function'"
                effect="dark"
                :content="item.name"
                placement="top-start"
              >
                <div @click="item.render">{{ item.name }}</div>
              </ElTooltip>
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
                    {{ item.name }}
                  </div>
                </template>
                <component :is="item.render" />
              </ElPopover>
            </template>
          </div>
        </div>
      </template>
      <ReTable
        :loading="loading"
        :tableData="tableData"
        :headData="columns"
        :selection="true"
        ref="table"
        height="calc(100vh - 230px)"
      >
        <template v-slot="data">
          <el-button type="primary" @click="click(data)"> 修改 </el-button>
        </template>
      </ReTable>
    </ReCard>
  </div>
</template>
