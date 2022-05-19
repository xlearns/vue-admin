import { ref } from "vue";
const ruleForm = ref({
  username: "admin",
  password: "admin"
});
// 是否记住密码
const passkeep = ref(false);
export const useLogin = () => {
  return {
    passkeep,
    ruleForm
  };
};
