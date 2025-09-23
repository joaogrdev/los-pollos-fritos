import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const LoadingSpinner = ({ position }: { position?: string }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 bg-light-base/50 rounded-md justify-center mb-2 py-5 w-full",
        position === "start"
          ? "justify-start"
          : position === "end"
          ? "justify-end"
          : "justify-center"
      )}
    >
      <div role="status">
        <Loader
          className={cn("w-5 text-contrast animate-spin fill-contrast")}
        />
        <span className={cn("sr-only")}>Carregando...</span>
      </div>
      <p className={cn("text-sm")}>CARREGANDO...</p>
    </div>
  );
};

export default LoadingSpinner;
