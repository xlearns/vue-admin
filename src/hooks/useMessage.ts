import {
  ElMessage as Message,
  ElNotification as notification,
  ElMessageBox as Model
} from "element-plus";
function createSuccessModal(options, icon) {
  Model.confirm(
    "proxy will permanently delete the file. Continue?",
    "Warning",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "success"
    }
  ).then(() => {});
}

export function useMessage() {
  return {
    message: Message,
    notification: notification,
    createSuccessModal
  };
}
