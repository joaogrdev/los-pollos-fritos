import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

type Pedido = {
  desconto: number;
  total: number;
  status: string;
  data: string;
};

export function useFinalizarPedido() {
  const loggedUser = useAuth();
  const db = getFirestore();

  const finalizarPedido = useMutation({
    mutationFn: async (pedido: Pedido) => {
      if (!loggedUser) throw new Error("Usuário não autenticado.");

      const pedidoRef = collection(db, "pedidos");
      const pedidoSnapshot = await getDocs(
        query(
          pedidoRef,
          where("usuario_id", "==", loggedUser.uid),
          where("status", "==", "carrinho")
        )
      );

      if (pedidoSnapshot.docs[0].data().endereco === "") {
        throw new Error("Preencha o endereço antes de finalizar o pedido.");
      }

      const orderDocRef = pedidoSnapshot.docs[0].ref;
      await updateDoc(orderDocRef, {
        desconto: pedido.desconto || 0,
        total: pedido.total || 0,
        status: "pedido",
        data: pedido.data,
      });

      return orderDocRef.id;
    },
  });

  return {
    finalizarPedido
  };
}
