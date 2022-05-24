import { ref } from "vue";
import { usePermission } from "@/hooks/usePermission";
import { router } from "@/router";
import { useUserStore } from "@/stores/modules/user";
const { changeRole } = usePermission();
const userStore = useUserStore();

const ruleForm = ref({
  username: "admin",
  password: "admin"
});
// 是否记住密码
const passkeep = ref(false);
// 当前页面
const currentPage = ref(1);
export const useLogin = () => {
  function onLogin() {
    userStore.setToken("test");
    changeRole("test");
    router.push("/");
  }
  function logout() {
    localStorage.clear();
    location.reload();
  }
  function onHandle(index: number) {
    console.log(index);
  }
  return {
    logout,
    onHandle,
    onLogin,
    passkeep,
    ruleForm,
    currentPage
  };
};
