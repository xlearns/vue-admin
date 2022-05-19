<script setup lang="ts">
import Motion from "./Motion.vue";
import { operates } from "../utils/enums";
import { useLogin } from "@/hooks/login/useLogin";
const { ruleForm, passkeep,onLogin,onHandle} = useLogin();
</script>

<template>
  <el-form>
    <Motion :delay="100">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" clearable placeholder="账号" />
      </el-form-item>
    </Motion>
    <Motion :delay="150">
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          clearable
          show-password
          placeholder="密码"
        />
      </el-form-item>
    </Motion>

    <Motion :delay="250">
      <el-form-item>
        <div class="w-full h-20px flex justify-between items-center">
          <el-checkbox v-model="passkeep">记住密码</el-checkbox>
          <el-button type="text"> 忘记密码? </el-button>
        </div>
        <el-button class="w-full mt-4" size="default" type="primary" @click='onLogin'>
          登录
        </el-button>
      </el-form-item>
    </Motion>

    <Motion :delay="300">
      <el-form-item>
        <div class="w-full h-20px flex justify-between items-center">
          <el-button
            v-for="(item, index) in operates"
            :key="index"
            class="w-full mt-4"
            size="default"
             @click="onHandle(index + 1)"
          >
            {{ item.title }}
          </el-button>
        </div>
      </el-form-item>
    </Motion>
  </el-form>
</template>

<style scoped></style>
