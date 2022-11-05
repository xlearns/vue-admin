<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { bg, currentWeek } from "./utils/static";
import { useLogin } from "@/hooks/login/useLogin";
import Motion from "./component/Motion.vue";
import LoginForm from "./component/LoginForm.vue";
import RegisterForm from "./component/RegisterForm.vue";
import { AppLocalePicker, AppDarkModeToggle } from "@/components/application";
import { useMenuSetting } from "@/hooks/useMenuSetting";
import { http } from "@/utils/http";
function login(data?) {
  return http.request("post", "api/login", { data });
}

const { initTheme } = useMenuSetting();
const { currentPage } = useLogin();
let { t } = useI18n();
onMounted(() => {
  initTheme();
});
</script>
<template>
  <AppDarkModeToggle class="absolute top-2 right-8" />
  <AppLocalePicker class="w-16px h-16px absolute top-4 right-4" />
  <img :src="bg" class="<lg:hidden fixed h-full left-0 bottom-0 -z-1" />
  <div
    class="bg <xl:gap-9rem <lg:grid-cols-1 w-full h-full grid grid-cols-[1fr,1fr] gap-18rem px-2rem"
  >
    <div class="<lg:hidden flex justify-end items-center">
      <Motion>
        <!-- <component :is="currentWeek" /> -->
        <currentWeek class="icon-svg" />
      </Motion>
    </div>
    <div class="<lg:justify-center flex items-center">
      <div class="w-290px text-left xl:w-360px">
        <Motion>
          <h2 class="mb-3 text-2xl font-bold">
            {{ currentPage === 1 ? t("login.title") : t("register.title") }}
          </h2>
        </Motion>
        <LoginForm v-if="currentPage === 1" />
        <RegisterForm v-if="currentPage === 2" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "./index";
</style>
