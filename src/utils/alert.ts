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
