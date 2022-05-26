<script setup lang="ts">
import { inject } from "vue";
import contentMenu from "@/components/contextmenu/contextMenu.vue";
import { useMenuNav } from "@/hooks/useMenuNav";

const emitContext = inject("emitContext") as Fn;
const hideContext = inject("hideContext") as Fn;

const { data, activeKey, closable, close, current, contextMenuFn } =
  useMenuNav();

function openContextMenu(e, index) {
  current.value = index;
  emitContext(e, { name: "context-menu-1" });
}
function handleMouseEnter(index, type) {
  if (type) {
    closable.value = index;
  } else {
    closable.value = "";
  }
}
</script>

<template>
  <div class="tags-view">
    <div class="arrow-left"></div>
    <div class="scroll-container">
      <el-tag
        class="scroll-item mr-1"
        :class="{ active: activeKey === -1 }"
        @click="activeKey = -1"
        @contextmenu.native="openContextMenu"
        >首页
      </el-tag>

      <el-tag
        class="scroll-item mr-1"
        :disable-transitions="true"
        :class="{ active: activeKey === index }"
        v-for="(item, index) in data"
        :key="item.key"
        @click="activeKey = index"
        @close="close(index)"
        @mouseenter="handleMouseEnter(index, true)"
        @mouseleave="handleMouseEnter(index, false)"
        @contextmenu="openContextMenu($event, index)"
        :closable="activeKey === index || closable === index"
      >
        {{ item.name }}
      </el-tag>
    </div>
    <div class="arrow-right"></div>
    <div class="right-button"></div>
  </div>
  <contentMenu @contextMenuFn="contextMenuFn" />
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
