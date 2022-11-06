import type { PropType } from "vue";
import type { HeadData } from "./type";

export const tableProps = {
  size: {
    type: String,
    default: ""
  },
  height: {
    type: [Number, String],
    default: "100%"
  },
  selection: {
    type: Boolean,
    default: false
  },
  tableData: {
    type: Array,
    default: () => []
  },
  action: {
    type: Object,
    default: () => ({})
  },
  headData: {
    type: Array as PropType<HeadData>,
    default: () => []
  },
  headercellStyle: {
    type: Object,
    default: () => ({})
  },
  cellStyle: {
    type: Function,
    default: () => () => ({})
  },
  rowState: {
    type: Function,
    default: () => () => ({})
  }
};
