import Swal from "sweetalert2";
import { AlertCustomAutoCompleteProps } from "../types/Alert";
import { createRoot } from "react-dom/client";

export const AlertCustomAutoComplete = async (
  props: AlertCustomAutoCompleteProps
) => {
  const { title, html, showCancelBtn, showConfirmBtn } = props;
  const swalContainer = document.createElement("div");
  createRoot(swalContainer).render(html);
  return await Swal.fire({
    title: title,
    html: swalContainer,
    showCancelButton: showCancelBtn,
    showConfirmButton: showConfirmBtn,
  });
};

export const showAlertSuccess = (
  title?: string,
  html?: string,
  timer?: number
) => {
  return Swal.fire({
    title,
    html,
    icon: "success",
    showConfirmButton: false,
    timer: timer ?? 2000,
  });
};

export const showAlertConfirm = (
  title?: string,
  html?: string,
  textOk?: string,
  textCancel?: string
) => {
  return Swal.fire({
    title: title ?? "",
    html,
    icon: "warning",
    showConfirmButton: true,
    showCancelButton: !!textCancel,
    confirmButtonText: textOk ?? "Xác nhận",
    cancelButtonText: textCancel ?? "Hủy",
    showCloseButton: true,
    reverseButtons: true,
    focusCancel: true,
  });
};

export const showAlertError = (
  title?: string,
  html?: string,
  textClose?: string
) => {
  return Swal.fire({
    title,
    html,
    icon: "error",
    confirmButtonText: textClose ?? 'Đóng',
    showConfirmButton: true,
  });
};
