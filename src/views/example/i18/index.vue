<script setup lang="ts">
import { useI18n } from "vue-i18n";
let { t } = useI18n();
</script>

<template>
  <div>{{ t("test.hello") }}</div>

  <el-pagination
    :page-sizes="[100, 200, 300, 400]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
  />
</template>

<style scoped></style>
