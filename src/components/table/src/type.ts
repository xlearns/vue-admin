import type { VNodeChild } from "vue";

type Params = {
  row?: object;
  column?: string;
};

type KeyType = string | number;

// bug: ref ts error

export type HeadData = {
  // label: string;
  // prop: string;
  // width?: KeyType;
  // align?: string;
  // show?: boolean;
  // render?: (params?: Params) => VNodeChild;
  // formatter?: (val?: KeyType) => KeyType;
  [key: string]: any;
};
