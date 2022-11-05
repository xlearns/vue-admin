import { ref } from "vue";

export function useDomClient() {
  const dom = ref();
  const width = ref(0);
  const height = ref(0);
  const init = function () {
    width.value = dom.value.clientWidth;
    height.value = dom.value.clientHeight;
  };
  return {
    dom,
    init,
    height,
    width
  };
}
