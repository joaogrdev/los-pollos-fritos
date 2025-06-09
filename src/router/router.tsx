// src/router/router.tsx
import { createBrowserRouter } from "react-router";
import Home from "@/pages/Home/Home";
import { EstruturaSidebarMain } from "@/components/EstruturaSidebarMain/EstruturaSidebarMain";
import Cardapio from "@/pages/Cardapio/Cardapio";
import Carrinho from "@/pages/Carrinho/Carrinho";
import Sobre from "@/pages/Sobre/Sobre";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <EstruturaSidebarMain />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "cardapio",
        element: <Cardapio />,
      },
      {
        path: "carrinho",
        element: <Carrinho />,
      },
      {
        path: "sobre",
        element: <Sobre />,
      },
    ],
  },
]);
