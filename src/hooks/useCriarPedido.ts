import { useMutation } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";

type Pedido = {
  data?: string;
  desconto?: number;
  status?: string;
  total?: number;
  usuario_id?: string;
};

const auth = getAuth();
const db = getFirestore();

export function useCriarPedido() {
  const criarPedido = useMutation<any, any, Pedido>({
    mutationFn: async (pedido: Pedido) => {
      const user = auth.currentUser;
      if (!user) throw new Error("Usuário não autenticado.");

      const ordersRef = collection(db, "pedidos");
      const orderDoc = await addDoc(ordersRef, {
        usuario_id: user.uid,
        desconto: pedido.desconto || 0,
        total: pedido.total || 0,
        status: pedido.status || "carrinho",
        data: serverTimestamp(),
      });

      return orderDoc.id;
    },
  });

  return criarPedido;
}
