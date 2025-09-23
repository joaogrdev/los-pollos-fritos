import {
  CircleCheckBig,
  CircleX,
  Loader,
} from "lucide-react";
import { toast } from "sonner";

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

const duration = 3000;
const richcolors = false;
const colorError = "#a00b26";
const colorSucess = "#26488c";
const bgColor = "#f1ddbf";

export const toastError = (
  title: string,
  description?: string,
  position: ToastPosition = "bottom-right"
) => {
  toast.error(title, {
    description,
    duration: duration,
    position,
    richColors: richcolors,
    style: {
      color: colorError,
      gap: "1rem",
      background: bgColor,
      fontSize: ".9rem",
      border: `1px solid ${colorError}`,
    },
    icon: <CircleX />,
  });
};

export const toastSuccess = (
  title: string,
  description?: string,
  position: ToastPosition = "bottom-right"
) => {
  toast.success(title, {
    description,
    duration: duration,
    position,
    richColors: richcolors,
    style: {
      color: colorSucess,
      gap: "1rem",
      background: bgColor,
      fontSize: ".9rem",
      border: `1px solid ${colorSucess}`,
    },
    icon: <CircleCheckBig />,
  });
};

export const toastLoading = (
  title: string,
  description?: string,
  position: ToastPosition = "bottom-right"
) => {
  toast.loading(title, {
    description,
    duration: duration,
    position,
    richColors: richcolors,
    style: { gap: "1rem", background: bgColor, fontSize: ".9rem", border: `1px solid ${bgColor}` },
    icon: <Loader />,
  });
};
