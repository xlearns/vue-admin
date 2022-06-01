<script setup lang="ts"></script>

<template>
  <el-main class="bg-[#f0f2f5]">
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
  </el-main>
</template>
<!-- <style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
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
  margin: 24px;
}
</style>
