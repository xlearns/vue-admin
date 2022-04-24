import { createApp, h, render } from "vue";
import Empty from "@/components/directive/empty.vue";

let lock = false;

function exec(el, binding, vbode) {
  el.style.position = el.style.position || "relative";
  const { offsetHeight, offsetWidth } = el;
  const { visible, content, img } = binding.value;
  const defaultStyle =
    "position:absolute;top:0;left:0;z-index:9999;background:#fff;display:flex;justify-content: center;align-items: center;";
  const temp = {
    render() {
      return h(
        "div",
        {
          style: `height:${offsetHeight}px;width:${offsetWidth}px;${defaultStyle}`
        },
        [
          h(
            "div",
            {
              style: `display:flex;flex-direction:column;justify-content:center;align-items:center`
            },
            [
              img && h("img", { src: img, style: `height:30%;width:30%` }),
              h("div", {}, [content || "暂无数据"])
            ]
          )
        ]
      );
    }
  };

  const container = document.createElement("div");
  const app = createApp(temp);
  const dom = app.mount(container).$el;

  // const instance = createVNode(Empty);
  // render(instance, container);

  if (visible) {
    lock = true;
    el.appendChild(dom);
  } else if (lock) {
    lock = false;
    el.removeChild(el.lastChild);
  }
}
export default {
  mounted(el, binding, vnode) {
    exec(el, binding, vnode);
  },
  updated(el, binding, vnode) {
    exec(el, binding, vnode);
  }
};
