<script setup lang="ts">
import { h, ref, watchEffect } from "vue";
import ReTable from "@c/table";
const table = ref();
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
    <ReTable
      :tableData="tableData"
      :headData="columns"
      :height="470"
      :selection="true"
      ref="table"
    >
      <template v-slot="data">
        <el-button type="primary" @click="click(data)"> 修改 </el-button>
      </template>
    </ReTable>
  </div>
</template>
