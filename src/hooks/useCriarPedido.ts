import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

type Pedido = {
  data?: string;
  desconto?: number;
  status?: string;
  total?: number;
  usuario_id?: string;
  endereco?: string;
};

export function useCriarPedido() {
  const loggedUser = useAuth();
  const db = getFirestore();
  const queryClient = useQueryClient();

  const criarPedido = useMutation<any, any, Pedido>({
    mutationFn: async (pedido: Pedido) => {
      if (!loggedUser) throw new Error("Usuário não autenticado.");

      const ordersRef = collection(db, "pedidos");
      const orderDoc = await addDoc(ordersRef, {
        usuario_id: loggedUser.uid,
        desconto: pedido.desconto || 0,
        total: pedido.total || 0,
        status: pedido.status || "carrinho",
        endereco: "",
        data: serverTimestamp(),
      });

      return orderDoc.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carrinho", loggedUser?.uid],
      });
    },
  });

  return criarPedido;
}
