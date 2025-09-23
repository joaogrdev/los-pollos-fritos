import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import type { Produto } from "@/types/produto";

// type Produto = {
//   id: string;
//   nome: string;
//   valor: number;
//   imagem: string;
//   descricao: string;
//   tipo: string;
// };

export function useGetCarrinho() {
  const loggedUser = useAuth();

  const {
    data: carrinho,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["carrinho", loggedUser?.uid],
    queryFn: async (): Promise<Produto[]> => {
      const pedidoRef = collection(db, "pedidos");
      const pedidoSnapshot = await getDocs(
        query(
          pedidoRef,
          where("usuario_id", "==", loggedUser.uid),
          where("status", "==", "carrinho")
        )
      );
      if (pedidoSnapshot.empty) return [];

      const itensRef = collection(db, "itens-pedido");
      const snapshot = await getDocs(
        query(
          itensRef,
          where("usuario_id", "==", loggedUser.uid),
          where("pedido_id", "==", pedidoSnapshot.docs[0].id)
        )
      );
      if (snapshot.empty) return [];

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Produto[];
    },
    enabled: !!loggedUser,
    staleTime: Infinity,
  });

  return {
    carrinho,
    isLoading,
    isSuccess,
    error,
  };
}
