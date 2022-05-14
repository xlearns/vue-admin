<script setup lang="ts">
import { useI18n } from "vue-i18n";
let { locale, t } = useI18n();
</script>

<template>
  <div>{{ t("test.hello") }}</div>
</template>

<style scoped></style>
