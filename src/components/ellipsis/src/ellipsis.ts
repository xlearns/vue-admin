import type { PropType } from "vue";

export const ellipsisProps = {
  effect: {
    type: String,
    default: "dark"
  },
  placement: {
    type: String,
    default: "top"
  },
  content: {
    type: String,
    default: "placeholder"
  },
  ellipsis: {
    type: Object,
    default: () => ({})
  }
};
