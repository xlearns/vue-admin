import { usePermission } from "@/hooks/usePermission";

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
