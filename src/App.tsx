import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
