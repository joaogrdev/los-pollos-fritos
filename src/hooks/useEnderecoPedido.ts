import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export function useEnderecoPedido() {
  const loggedUser = useAuth();
  const db = getFirestore();
  const queryClient = useQueryClient();

  const alterarEnderecoPedido = useMutation({
    mutationFn: async (endereco?: string) => {
      if (!loggedUser) throw new Error("Usuário não autenticado.");

      const pedidoRef = collection(db, "pedidos");
      const pedidoSnapshot = await getDocs(
        query(
          pedidoRef,
          where("usuario_id", "==", loggedUser.uid),
          where("status", "==", "carrinho")
        )
      );

      const orderDocRef = pedidoSnapshot.docs[0].ref;
      await updateDoc(orderDocRef, {
        endereco: endereco || "",
      });

      return orderDocRef.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carrinho", loggedUser?.uid],
      });
    },
  });

  return {
    alterarEnderecoPedido,
  };
}
