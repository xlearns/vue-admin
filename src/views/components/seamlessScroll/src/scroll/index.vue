<script setup lang="ts">
import { ref, reactive } from "vue";
import { templateRef } from "@vueuse/core";
import SeamlessScroll from "@/components/charts/seamlessScroll/index.vue";

const scroll = templateRef<ElRef | null>("scroll", null);

let listData = ref([
  {
    date: "2022-06-01",
    name: "vue-admin",
    star: "1000"
  },
  {
    date: "2022-06-02",
    name: "vue-admin",
    star: "1100"
  },
  {
    date: "2022-06-03",
    name: "vue-admin",
    star: "1200"
  },
  {
    date: "2022-06-04",
    name: "vue-admin",
    star: "1300"
  },
  {
    date: "2022-06-05",
    name: "vue-admin",
    star: "1400"
  },
  {
    date: "2022-06-06",
    name: "vue-admin",
    star: "1500"
  },
  {
    date: "2022-06-07",
    name: "vue-admin",
    star: "1600"
  },
  {
    date: "2022-06-08",
    name: "vue-admin",
    star: "1700"
  },
  {
    date: "2022-06-09",
    name: "vue-admin",
    star: "1800"
  },
  {
    date: "2022-06-10",
    name: "vue-admin",
    star: "1900"
  }
]);

let classOption = reactive({
  direction: "top"
});
</script>

<template>
  <div class="infinite">
    <ul class="top">
      <li>更新日期</li>
      <li>项目名称</li>
      <li>Star数量</li>
    </ul>
    <SeamlessScroll
      ref="scroll"
      :data="listData"
      :class-option="classOption"
      class="warp"
    >
      <ul class="item">
        <li v-for="(item, index) in listData" :key="index">
          <span v-text="item.date" />
          <span v-text="item.name" />
          <span v-text="item.star" />
        </li>
      </ul>
    </SeamlessScroll>
  </div>
</template>

<style lang="scss" scoped>
.infinite {
  .top {
    display: flex;
    margin: 0 auto;
    width: 95%;
    height: 40px;
    font-size: 14px;
    font-weight: 400;
    color: #909399;
    background: #fafafa;
    line-height: 40px;

    li {
      overflow: hidden;
      width: 34%;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .warp {
    overflow: hidden;
    margin: 0 auto;
    width: 95%;
    height: 215px;

    li {
      display: flex;
      height: 30px;
      font-size: 15px;
      line-height: 30px;
    }

    span {
      overflow: hidden;
      width: 34%;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
