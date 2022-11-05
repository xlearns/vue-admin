import { ref } from "vue";
const topData = ref([]);

const dataTest = [
  {
    title: "访问数",
    value: "2000",
    time: "周"
  },
  {
    title: "成交额",
    value: "2000",
    time: "周"
  },
  {
    title: "下载数",
    value: "2000",
    time: "周"
  },
  {
    title: "成交数",
    value: "2000",
    time: "周"
  }
];

test();

function test() {
  topData.value = dataTest;
}
export function useWelcome() {
  return {
    topData
  };
}
