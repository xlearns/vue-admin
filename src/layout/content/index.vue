<script setup lang="ts">
import { useMainElement } from "@/hooks/useMainElement";
// add ?component fix ts type error
import BackTop from "@/assets/svg/back_top.svg?component";
const { el } = useMainElement();
</script>

<template>
  <el-main
    ref="el"
    class="main-container bg-[#f0f2f5] h-[100vh] !overflow-hidden"
  >
    <el-scrollbar>
      <div class="p-[20px] h-full w-full box-border">
        <RouterView>
          <template #default="{ Component, route }">
            <el-backtop
              title="回到顶部"
              target=".main-container .el-scrollbar__wrap"
            >
              <BackTop />
            </el-backtop>
            <!-- todo: 缓存 -->
            <transition name="route-animate" mode="out-in" appear>
              <component :is="Component" :key="route.fullPath" />
            </transition>
          </template>
        </RouterView>
      </div>
    </el-scrollbar>
  </el-main>
</template>
<!-- <style scoped>
@use "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
</style> -->
<style scoped type="scss">
.el-main {
  padding: 0 !important;
}

.route-animate-enter-active,
.route-animate-leave-active {
  transition: all 0.5s;
}

.route-animate-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.route-animate-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
