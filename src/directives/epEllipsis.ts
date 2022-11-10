// todo: rewrite auto render vue components and no use setTimeout

interface Attrs {
  name: string;
  value: string | ((el?: HTMLElement) => any);
  type?: string;
}
function callback(el) {
  setTimeout(() => {
    const aria = el.getAttribute("aria-describedby");
    if (!aria) return;
    const client = el.offsetWidth;
    const scrollWidth = el.scrollWidth;
    const _ = document.querySelector(`#${aria}`);
    const dom = _.parentNode as HTMLElement;
    if (client < scrollWidth) {
      dom.style.opacity = "1";
    } else {
      dom.style.opacity = "0";
    }
  }, 5);
}
export default {
  mounted(el) {
    const attrs = [
      { name: "whiteSpace", value: "nowrap" },
      { name: "overflow", value: "hidden" },
      { name: "textOverflow", value: "ellipsis" },
      { name: "mouseover", value: () => callback(el), type: "function" }
    ] as const;

    attrs.forEach((attr: Attrs) => {
      const { name, value, type } = attr;
      if (type) {
        el.addEventListener(name, value);
      } else {
        el.style[name] = value;
      }
    });
  },
  unmounted(el) {
    el.removeEventListener("mouseover", () => callback(el));
  }
};
