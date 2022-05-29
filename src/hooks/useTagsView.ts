import { ref } from "vue";

const multiTags = ref([]);
export function useTagsView() {
  function handleTags(mode, value?) {
    switch (mode) {
      case "add": {
        const tagVal = value;
        if (!tagVal) return;
        const tagPath = tagVal?.path;
        // 判断tag是否已存在
        const tagHasExits = multiTags.value.some(tag => {
          return tag.path === tagPath;
        });
        if (tagHasExits) return;
        multiTags.value.push(tagVal);
        break;
      }
      case "remove": {
        const tagVal = value;
        if (!tagVal) return;
        const tagPath = tagVal?.path;
        const tagIndex = multiTags.value.findIndex(tag => {
          return tag.path === tagPath;
        });
        if (tagIndex === -1) return;
        multiTags.value.splice(tagIndex, 1);
        break;
      }
      default:
        break;
    }
  }
  return {
    handleTags,
    multiTags
  };
}
