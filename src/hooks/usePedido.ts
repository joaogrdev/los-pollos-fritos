import { useQuery } from "@tanstack/react-query";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "@/context/AuthContext";

export type ItemPedido = {
  id: string;
  nome: string;
  quantidade: number;
  valor: number;
  pedido_id: string;
  tipo: string;
  imagem: string;
};

export type Pedido = {
  id: string;
  data: string;
  desconto: number;
  status: string;
  total: number;
  usuario_id: string;
  itens?: ItemPedido[];
  endereco?: string;
};

export function usePedido(pedidoId: string) {
  const loggedUser = useAuth();

  const {
    data: pedido,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["pedido", pedidoId],
    queryFn: async (): Promise<Pedido | null> => {
      //pega pedido de acordo com ID passado
      const pedidoSnap = await getDoc(doc(db, "pedidos", pedidoId));
      if (!pedidoSnap.exists()) return null;

      // pega os itens vinculados a esse pedido
      const itensQuery = query(
        collection(db, "itens-pedido"),
        where("usuario_id", "==", loggedUser.uid),
        where("pedido_id", "==", pedidoId)
      );
      const itensPedido = await getDocs(itensQuery);

      const itens: ItemPedido[] = itensPedido.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ItemPedido[];

      return {
        id: pedidoId,
        ...pedidoSnap.data(),
        itens,
      } as Pedido;
    },
    enabled: !!pedidoId && !!loggedUser,
    staleTime: Infinity
  });

  return {
    pedido,
    isLoading,
    isSuccess,
    error,
  };
}
