<script setup lang="ts">
import { ref, inject } from "vue";
import { Func } from "./type";
import contentMenu from "@/components/contextmenu/contextMenu.vue";

const emitContext = inject("emitContext") as Func<string, { name: string }>;

let test = Array.from({ length: 10 }, (v, i) => {
  return {
    name: "首页",
    key: `home${i}`
  };
});
let data = ref([]);
let activeKey = ref(0);
let closable = ref();
data.value = test;

function handleMouseEnter(index, type) {
  if (type) {
    closable.value = index;
  } else {
    closable.value = "";
  }
}

function openContextMenu(e) {
  emitContext(e, { name: "context-menu-1" });
}
</script>

<template>
  <div class="tags-view">
    <div class="arrow-left"></div>
    <div class="scroll-container">
      <el-tag
        class="scroll-item mr-1"
        :disable-transitions="true"
        :class="{ active: activeKey === index }"
        v-for="(item, index) in data"
        :key="item.key"
        @click="activeKey = index"
        @mouseenter="handleMouseEnter(index, true)"
        @mouseleave="handleMouseEnter(index, false)"
        @contextmenu="openContextMenu"
        :closable="
          false && index != 0 && (activeKey === index || closable === index)
        "
      >
        {{ item.name }}
      </el-tag>
    </div>
    <div class="arrow-right"></div>
    <div class="right-button"></div>
  </div>
  <contentMenu />
</template>

<style lang="scss" scoped>
.tags-view {
  display: flex;
  width: 100%;
  font-size: 14px;
  background: #fff;

  .arrow-left {
    height: 38px;
  }

  .scroll-container {
    position: relative;
    overflow: hidden;
    padding: 5px 6px;
    white-space: nowrap;
    flex: 1;

    .scroll-item {
      cursor: pointer;
    }
  }

  .active {
    color: #fff;
    background: #0960bd;
  }
}
</style>
