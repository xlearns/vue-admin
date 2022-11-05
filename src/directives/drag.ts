export default {
  mounted(el, binding) {
    document.onselectstart = function () {
      return false; //禁止选择网页上的文字
    };
    el.style.position = "absolute";
    el.onmousedown = e => {
      const disX = e.clientX - el.offsetLeft; //鼠标按下，计算当前元素距离可视区的距离
      const disY = e.clientY - el.offsetTop;
      document.onmousemove = function (e) {
        const l = e.clientX - disX;
        const t = e.clientY - disY;
        el.style.left = l + "px";
        el.style.top = t + "px";
      };
      document.onmouseup = e => {
        document.onmousemove = document.onmouseup = null;
      };
      return false;
    };
  }
};
