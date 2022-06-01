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
const tagsData = ref([
  {
    name: "重新加载",
    key: "reload",
    url: "foundation:refresh"
  },
  {
    name: "关闭标签页",
    key: "closecurrent",
    url: "ci:close-small"
  },
  {
    name: "关闭左侧标签页",
    key: "closeleft",
    url: "bx:arrow-to-left"
  },
  {
    name: "关闭右侧标签页",
    key: "closeright",
    url: "bx:arrow-to-right"
  },
  {
    name: "关闭其它标签页",
    key: "closeother",
    url: "codicon:close-all"
  },
  {
    name: "关闭全部标签页",
    key: "closeall",
    url: "ant-design:minus-outlined"
  }
]);
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
const isdisable = computed(() => {
  return activeKey.value == current.value;
});

function leftRight(index) {
  let res = !isdisable.value;

  if (!res && index == 2) {
    res = !ableRight.value;
  } else if (!res && index == 3) {
    res = !ableLeft.value;
  } else if (index == 5) {
    res = false;
  }

  return res;
}
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
  function rightClick(index: number) {
    switch (index) {
      case 0:
        reload();
        break;
      case 1:
        break;
      case 2:
        break;
    }
  }
  return {
    isdisable,
    leftRight,
    tagsData,
    rightClick,
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
