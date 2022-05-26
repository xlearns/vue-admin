import { ref, computed } from "vue";

const test = Array.from({ length: 10 }, (v, i) => {
  return {
    name: `导航${i}`,
    key: `home${i}`
  };
});
const show = ref(false);
const activeKey = ref(0);
const closable = ref();
const current = ref();
const data = ref([]);
const type = ref();
data.value = test;
const ableRight = computed(() => {
  return data.value.some((v, i) => {
    return i < current.value;
  });
});
const ableLeft = computed(() => {
  return data.value.some((v, i) => {
    return i > current.value;
  });
});
export function useMenuNav() {
  function close(index: number) {
    data.value = data.value.filter((item, i) => i !== index);
  }
  function contextMenuFn(t: string) {
    switch (t) {
      case "closecurrent":
        activeKey.value = current.value;
        close(current.value);
        break;
      case "closeleft":
        activeKey.value = 0;
        data.value = data.value.filter((item, i) => {
          return i >= current.value;
        });
        break;
      case "closeright":
        activeKey.value = current.value;
        data.value = data.value.filter((item, i) => {
          return i <= current.value;
        });
        break;
      case "closeall":
        activeKey.value = -1;
        data.value = [];
        break;
      case "closeother":
        activeKey.value = current.value;
        data.value = data.value.filter((item, i) => i === current.value);
        break;
    }
  }

  return {
    ableRight,
    ableLeft,
    type,
    show,
    data,
    activeKey,
    closable,
    current,
    close,
    contextMenuFn
  };
}
