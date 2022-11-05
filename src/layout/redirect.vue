<script setup lang="ts">
import { useMenuNav } from "@/hooks/useMenuNav";
import { unref } from "vue";
import { useRouter } from "vue-router";

// unplugin-vue-define-options为 vue3.2设置name
defineOptions({
  name: "Redirect"
});

const { currentRoute, replace } = useRouter();

const { params, query } = unref(currentRoute);
const { path } = params;

const _path = Array.isArray(path) ? path.join("/") : path;

replace({
  path: "/" + _path,
  query
});
</script>

<template>
  <div />
</template>
