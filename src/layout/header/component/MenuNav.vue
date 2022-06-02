<script setup lang="ts">
import { inject, watchEffect } from "vue";
import contentMenu from "@/components/contextmenu/contextMenu.vue";
import { useMenuNav } from "@/hooks/useMenuNav";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
const emit = defineEmits({});
const router = useRouter();
const emitContext = inject("emitContext") as Fn;
const hideContext = inject("hideContext") as Fn;

const {
  rightData,
  rightClick,
  data,
  activeKey,
  closable,
  close,
  current,
  contextMenuFn,
  tagsData
} = useMenuNav();

function openContextMenu(e, index) {
  current.value = index;
  emitContext(e, { name: "context-menu-1" });
}
function gohome() {
  activeKey.value = -1;
  router.push("/");
}

function goto(route, index) {
  activeKey.value = index;
  router.push(route.path);
}
function handleMouseEnter(index, type) {
  if (type) {
    closable.value = index;
  } else {
    closable.value = "";
  }
}

function fn(type, bool: boolean) {
  if (bool) return;
  contextMenuFn(type);
}
</script>

<template>
  <div class="tags-view">
    <div class="arrow-left"></div>
    <div class="scroll-container">
      <el-tag
        class="scroll-item mr-1"
        :class="{ active: activeKey === -1 }"
        @click="gohome"
        @contextmenu.native="openContextMenu"
        >首页
      </el-tag>

      <el-tag
        class="scroll-item mr-1"
        :disable-transitions="true"
        :class="{ active: activeKey === index }"
        v-for="(item, index) in data"
        :key="item.key"
        @click="goto(item, index)"
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
    <div class="right-button">
      <el-tooltip
        :show-after="1000"
        effect="dark"
        :content="item.name"
        placement="bottom"
        v-for="(item, index) in rightData"
        :key="index"
        :disabled="index == 1"
      >
        <div
          class="right-button-item"
          v-if="index != 1"
          @click="rightClick(index)"
        >
          <Icon :icon="item.url" />
        </div>
        <div class="right-button-item" v-else @click="rightClick(index)">
          <el-dropdown trigger="click">
            <Icon :icon="item.url" />
            <template #dropdown>
              <el-dropdown-item
                v-for="(item, index) in tagsData.slice(1)"
                :key="index"
                :disabled="!item.disabled"
                :command="{ index, item }"
                @click="fn(item.key, !item.disabled)"
              >
                <Icon :icon="item.url" />{{ item.name }}
              </el-dropdown-item>
            </template>
          </el-dropdown>
        </div>
      </el-tooltip>
    </div>
  </div>
  <contentMenu @contextMenuFn="contextMenuFn" />
</template>

<style lang="scss" scoped>
.el-dropdown,
::v-deep(.el-tooltip__trigger) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

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

  .right-button {
    display: flex;

    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 38px;
      border-right: 1px solid #ccc;
      box-shadow: -5px 0 5px -6px #ccc;
      cursor: pointer;
    }
  }
}
</style>
