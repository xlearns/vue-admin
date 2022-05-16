import { usePermission } from "@/hooks/usePermission";
// 缺点:不能动态修改权限
// 动态可以直接使用hasPermission去判断
function isAuth(el: Element, binding: any) {
  const { hasPermission } = usePermission();
  const value = binding.value;
  if (!value) return;
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el);
  }
}

const mounted = (el: Element, binding) => {
  isAuth(el, binding);
};

const authDirective = {
  mounted
};

export default authDirective;
