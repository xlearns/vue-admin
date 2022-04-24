import {
  ElMessage as Message,
  ElNotification as notification,
  ElMessageBox as Model
} from "element-plus";

function createErrorModal({
  message = "操作失败",
  title = "",
  button = "OK",
  fn = null
}) {
  createModalOptions({
    message,
    title,
    button,
    type: "error"
  });
}
function createSuccessModal({
  message = "操作成功",
  title = "",
  button = "OK",
  fn = null
}) {
  createModalOptions({
    message,
    title,
    button,
    type: "success"
  });
}
function createInfoModal({
  message = "操作成功",
  title = "",
  button = "OK",
  fn = null
}) {
  createModalOptions({
    message,
    title,
    button,
    type: "info "
  });
}
function createWarningModal({
  message = "操作成功",
  title = "",
  button = "OK",
  fn = null
}) {
  createModalOptions({
    message,
    title,
    button,
    type: "warning"
  });
}

function createModalOptions(option) {
  Model.alert(option.message, option.title, {
    confirmButtonText: option.button,
    type: option.type
  }).then(() => {
    typeof option.fn == "function" && option.fn();
  });
}
export function useMessage() {
  return {
    message: Message,
    notification: notification,
    createSuccessModal,
    createErrorModal,
    createWarningModal,
    createInfoModal
  };
}
