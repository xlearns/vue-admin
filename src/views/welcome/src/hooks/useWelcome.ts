import { ref } from "vue";
const topData = ref([
  {
    title: "访问数",
    value: "2000"
  }
]);
export function useWelcome() {
  return {
    topData
  };
}
