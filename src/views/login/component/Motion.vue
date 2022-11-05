<script setup lang="ts">
defineProps({
  delay: {
    type: Number,
    default: 50
  }
});
</script>

<template>
  <div
    v-motion
    :initial="{
      opacity: 0,
      y: 100
    }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay
      }
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>
