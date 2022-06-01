import { ref, computed, watchEffect } from "vue";
import { useTagsView } from "@/hooks/useTagsView";
import router from "@/router";
const { handleTags, multiTags } = useTagsView();
const show = ref(false);
const activeKey = ref(0);
const closable = ref();
const current = ref();
const data = ref([]);
const type = ref();

watchEffect(() => {
  data.value = multiTags.value;
});

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
function reload() {
  const { currentRoute } = router;
  const { fullPath, query } = currentRoute.value;
  router.replace({
    path: "/redirect" + fullPath,
    query: query
  });
}
export function useMenuNav() {
  function close(index: number) {
    const value = activeKey.value;
    if (value == index) {
      if (multiTags.value[index - 1]) {
        router.push(multiTags.value[index - 1]?.path);
      } else {
        router.push("/");
      }
    }
    multiTags.value = multiTags.value.filter((item, i) => {
      return i !== index;
    });
    if (index < value) {
      activeKey.value = value - 1 == 0 ? 0 : value - 1;
    }
  }
  function contextMenuFn(t: string) {
    switch (t) {
      case "reload":
        reload();
        break;
      case "closecurrent":
        activeKey.value = current.value;
        close(current.value);
        break;
      case "closeleft":
        activeKey.value = 0;
        data.value = data.value.filter((item, i) => {
          return i >= current.value;
        });
        multiTags.value = multiTags.value.filter(
          (item, i) => i >= current.value
        );
        break;
      case "closeright":
        activeKey.value = current.value;
        data.value = data.value.filter((item, i) => {
          return i <= current.value;
        });
        multiTags.value = multiTags.value.filter(
          (item, i) => i <= current.value
        );
        break;
      case "closeall":
        activeKey.value = -1;
        data.value = [];
        multiTags.value = [];
        router.push("/");
        break;
      case "closeother":
        activeKey.value = 0;
        data.value = data.value.filter((item, i) => i === current.value);
        multiTags.value = multiTags.value.filter(
          (item, i) => i === current.value
        );
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
