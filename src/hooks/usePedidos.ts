import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "@/context/AuthContext";

type Pedido = {
  id: string;
  data: string;
  desconto: number;
  status: string;
  total: number;
  usuario_id: string;
};

export function usePedidos() {
  const loggedUser = useAuth();
  const {
    data: pedidos,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["pedidos"],
    queryFn: async (): Promise<Pedido[]> => {
      if (!loggedUser) throw new Error("Usuário não autenticado.");

      const ordersRef = collection(db, "pedidos");
      const q = query(
        ordersRef,
        where("usuario_id", "==", loggedUser.uid),
        where("status", "==", "pedido")
      );
      const querySnapshot = await getDocs(q);

      const orders: any[] = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });

      return orders;
    },
  });

  return {
    pedidos,
    isLoading,
    isSuccess,
    error,
  };
}
