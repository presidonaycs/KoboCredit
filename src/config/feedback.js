import Swal from "sweetalert2";

export const feedback = (
  {
    title = "Error!",
    text,
    iconType = "error",
    isDialog = false,
    showCancelButton = false,
    confirmButtonColor = "#3085d6",
    cancelButtonColor = "#d33",
    confirmButtonText = "Yes, delete it!",
  },
  callback
) => {
  if (isDialog) {
    Swal.fire({
      title: title,
      text: text,
      icon: iconType,
      showCancelButton: showCancelButton,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: cancelButtonColor,
      confirmButtonText: confirmButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        callback();
      }
    });
  } else {
    return Swal.fire({
      title: title,
      text: text,
      icon: iconType,
      confirmButtonText: "Ok",
    });
  }
};
