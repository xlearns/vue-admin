<script setup lang="ts"></script>

<template>
  <el-main class="bg-[#f0f2f5]">
    <RouterView>
      <template #default="{ Component, route }">
        <!-- todo:
             缓存
        -->
        <transition name="route-animate" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </template>
    </RouterView>
  </el-main>
</template>
<style scoped>
.route-animate-enter-active,
.route-animate-leave-active {
  opacity: 1;
  transition: opacity 0.4s ease-in;
}

.route-animate-enter,
.route-animate-leave-to {
  opacity: 0;
}
</style>
