<script setup lang="ts">
import ReTable from "@c/table";
const tableData = Array.from({ length: 10 }, () => ({
  id: 1,
  name: "John Brown",
  age: 18,
  address: "New York No. 1 Lake Park",
  date: "2016-10-03",
  code: "code",
  type: "admin",
  sort: 1,
  createTime: Date.now()
}));

const columns = ref([
  {
    type: "selection",
    width: 55,
    label: "勾选列"
  },
  {
    label: "序号",
    type: "index",
    width: 70,
    hide: false
  },
  {
    label: "角色编号",
    prop: "id",
    hide: false
  },
  {
    label: "角色名称",
    prop: "name"
  },
  {
    label: "角色标识",
    prop: "code"
  },
  {
    label: "角色类型",
    prop: "type",
    cellRenderer: ({ row, props }) => {}
  },
  {
    label: "显示顺序",
    prop: "sort"
  },
  {
    label: "创建时间",
    width: 180,
    prop: "createTime",
    formatter: ({ createTime }) => {}
  },
  {
    label: "操作",
    fixed: "right",
    width: 180,
    slot: "operation"
  }
]);
</script>

<template>
  <div>
    <ReTable :data="tableData" :columns="columns" :border="true">
      <template #operation>
        <el-button type="primary"> 修改 </el-button>
      </template>
    </ReTable>
  </div>
</template>
