import type { VNodeChild } from "vue";

type Params = {
  row?: object;
  column?: string;
};
export type HeadData = {
  width?: string | number;
  label: string;
  prop: string;
  align?: string;
  render?: (params?: Params) => VNodeChild;
  formatter?: (val?: string | number) => string | number;
}[];
