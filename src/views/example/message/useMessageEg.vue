<script setup lang="ts">
import { useMessage } from "@/hooks/useMessage";
let { message, notification, createErrorModal, createWarningModal } =
  useMessage();

function btn() {
  message({
    showClose: true,
    message: "Hello World",
    type: "success"
  });
  notification({
    title: "Success",
    message: "This is a success message",
    type: "success"
  });
  createErrorModal({});

  createWarningModal({});
}
</script>
<template>
  <button @click="btn">button</button>
</template>

<style scoped></style>
