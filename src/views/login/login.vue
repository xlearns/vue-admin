<script setup lang="ts">
import { bg, currentWeek } from "./utils/static";
import Motion from "./utils/motion.vue";
import { operates } from "./utils/enums";
import { useLogin } from "@/hooks/login/useLogin";

const { ruleForm, passkeep } = useLogin();
</script>
<template>
  <img :src="bg" class="<lg:hidden fixed h-full left-0 bottom-0 -z-1" />
  <div
    class="<xl:gap-9rem <lg:grid-cols-1 w-full h-full grid grid-cols-[1fr,1fr] gap-18rem px-2rem"
  >
    <div class="<lg:hidden flex justify-end items-center">
      <Motion>
        <!-- <component :is="currentWeek" /> -->
        <currentWeek />
      </Motion>
    </div>
    <div class="<lg:justify-center flex items-center">
      <div class="w-290px text-left xl:w-360px">
        <Motion>
          <h2 class="mb-3 text-2xl font-bold">登录</h2>
        </Motion>

        <el-form>
          <Motion :delay="100">
            <el-form-item prop="username">
              <el-input
                v-model="ruleForm.username"
                clearable
                placeholder="账号"
              />
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
              <el-button class="w-full mt-4" size="default" type="primary">
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
                >
                  {{ item.title }}
                </el-button>
              </div>
            </el-form-item>
          </Motion>
        </el-form>
      </div>
    </div>
  </div>
</template>
