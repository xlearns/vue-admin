import { ref } from "vue";
import { useElementSize } from "@vueuse/core";
const el = ref(null);
const { width, height } = useElementSize(el);

function useMainElement() {
  return {
    el,
    width,
    height
  };
}
export { useMainElement };
