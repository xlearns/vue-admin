import { ref } from "vue";

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

export function useMenuNav() {
  function close(index: number) {
    data.value = data.value.filter((item, i) => i !== index);
  }
  function contextMenuFn(t: string) {
    switch (t) {
      case "closecurrent":
        close(current.value);
        break;
      case "closeleft":
        data.value = data.value.splice(current.value);
        break;
      case "closeright":
        data.value = data.value.filter((item, i) => {
          return i <= current.value;
        });
        break;
      case "closeall":
        data.value = [];
        break;
      case "closeother":
        data.value = data.value.filter((item, i) => i === current.value);
        break;
    }
  }

  return {
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
