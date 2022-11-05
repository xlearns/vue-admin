<script setup lang="ts">
import Notice from "./notice.vue";
import News from "./news.vue";
import Todo from "./todo.vue";
import { ref } from "vue";
import { useNotice } from "./src/useNotice";
const { NoticeData, NewsData, TodoData } = useNotice();
let data = [
  {
    title: "通知",
    name: "notice",
    component: Notice,
    icon: "carbon:notification",
    num: NoticeData.value.length
  },
  {
    title: "消息",
    name: "news",
    component: News,
    icon: "carbon:news",
    num: NewsData.value.length
  },
  {
    title: "待办",
    name: "todo",
    component: Todo,
    icon: "carbon:todo",
    num: TodoData.value.length
  }
];
const activeName = ref("notice");
function handleClick() {}
</script>

<template>
  <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane
      :label="`${item.title}(${item.num})`"
      :name="item.name"
      v-for="(item, index) in data"
      :key="index"
    >
      <component :is="item.component" />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
.tabs :deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: center;
}
</style>
