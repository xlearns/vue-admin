import { ref } from "vue";
const test1 = Array.from({ length: 6 }).map((v, i) => {
  return {
    title: `你收到了${i}份新周报`,
    time: "一年前"
  };
});
const test2 = Array.from({ length: 3 }).map((v, i) => {
  return {
    title: `李白${i} 评论了你`,
    content:
      "请将鼠标移动到此处，以便测试超长的消息在此处将如何处理。本例中设置的描述最大行数为2，超过2行的描述内容将被省略并且可以通过tooltip查看完整内容",
    time: "一年前"
  };
});
const NoticeData = ref([]);
const NewsData = ref([]);
const TodoData = ref([]);
NoticeData.value = test1;
NewsData.value = test2;
export const useNotice = () => {
  return {
    NewsData,
    TodoData,
    NoticeData
  };
};
