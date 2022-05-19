import { ref } from "vue";
const ruleForm = ref({
  username: "admin",
  password: "admin"
});
// 是否记住密码
const passkeep = ref(false);
// 当前页面
const currentPage = ref(1);
export const useLogin = () => {
  function onLogin() {}
  function onHandle(index: number) {
    console.log(index);
  }
  return {
    onHandle,
    onLogin,
    passkeep,
    ruleForm,
    currentPage
  };
};
