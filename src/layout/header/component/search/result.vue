<script setup lang="ts">
interface optionsItem {
  path: string;
  meta: {
    title: string;
    icon: string;
  };
}
type optionsItemSelectable<T> = T extends object
  ? {
      [o in keyof T]?: optionsItemSelectable<T[o]>;
    }
  : T;

interface Props {
  options: Array<optionsItemSelectable<optionsItem>>;
}

defineProps<Props>();
</script>

<template>
  <div class="result">
    <template v-for="item in options" :key="item.path">
      <router-link :to="item.path">
        <div class="result-item">
          <span class="result-item-title">
            {{ item.meta.title }}
          </span>
        </div>
      </router-link>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.result {
  padding-bottom: 12px;

  &-item {
    display: flex;
    align-items: center;
    margin-top: 8px;
    padding: 14px;
    height: 56px;
    border-radius: 4px;
    background: #e5e7eb;
    cursor: pointer;

    &-title {
      display: flex;
      flex: 1;
      margin-left: 5px;
    }
  }
}
</style>
