import { ref } from "vue";
const topData = ref([]);
test();

function test() {
  topData.value = Array.from({ length: 4 }, () => ({
    title: "访问数",
    value: "2000"
  }));
}
export function useWelcome() {
  return {
    topData
  };
}
