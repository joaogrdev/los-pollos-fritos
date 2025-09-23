// src/router/router.tsx
import { createBrowserRouter } from "react-router";
import Home from "@/pages/Home/Home";
import { EstruturaSidebarMain } from "@/components/EstruturaSidebarMain/EstruturaSidebarMain";
import Cardapio from "@/pages/Cardapio/Cardapio";
import Carrinho from "@/pages/Carrinho/Carrinho";
import Produto from "@/pages/Produto/Produto";
import Pedidos from "@/pages/Pedidos/Pedidos";
import Login from "@/pages/Login/Login";

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
        path: "/cardapio/produto/:id",
        element: <Produto />,
      },
      {
        path: "carrinho",
        element: <Carrinho />,
      },
      {
        path: "pedidos",
        element: <Pedidos />,
      },
      {
        path: "login",
        element: <Login />,
      }
    ],
  },
]);
