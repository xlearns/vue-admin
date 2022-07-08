<script setup lang="ts">
import { Avatar } from "../utils/static";
import { useLogin } from "@/hooks/login/useLogin";
const { logout } = useLogin();
</script>

<template>
  <el-dropdown trigger="click">
    <div class="box">
      <el-avatar :size="25" :src="Avatar" class="mr-10px" />
      <span>admin</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
@use "index";
</style>
