<script setup lang="ts">
import { useMainElement } from "@/hooks/useMainElement";
const { el } = useMainElement();
</script>

<template>
  <el-main ref="el" class="bg-[#f0f2f5] h-[100vh] !overflow-hidden">
    <el-scrollbar>
      <RouterView>
        <template #default="{ Component, route }">
          <!-- todo:
             缓存
        -->
          <transition name="route-animate" mode="out-in" appear>
            <component
              :is="Component"
              :key="route.fullPath"
              class="main-content"
            />
          </transition>
        </template>
      </RouterView>
    </el-scrollbar>
  </el-main>
</template>
<!-- <style scoped>
@use "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
</style> -->
<style scoped>
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

.main-content {
  margin: 0 24px;
}
</style>
