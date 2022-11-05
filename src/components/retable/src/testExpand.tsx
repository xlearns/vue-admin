/*
 * @Descripttion:
 * @version:
 * @Author: zhangguian
 * @Date: 2021-12-25 17:36:06
 * @LastEditors: zhangguian
 * @LastEditTime: 2021-12-28 00:01:19
 */
import { h, getCurrentInstance, defineComponent } from "vue";
export default defineComponent({
  name: "Expand",
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },
  // proxy: getCurrentInstance(),
  render() {
    return this.render(this.row);
  }
});
