import { ref } from "vue";
const ruleForm = ref({
  username: "",
  password: ""
});
export const useLogin = () => {
  return {
    ruleForm
  };
};
