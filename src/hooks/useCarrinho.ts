import { useAuth } from "@/context/AuthContext";
import type { Produto } from "@/types/produto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

type ItemCarrinho = {
  id?: string;
  nome?: string;
  quantidade?: number;
  valor?: number;
  imagem?: string;
  tipo?: string;
  produto_id?: string;
};

export function useCarrinho() {
  const loggedUser = useAuth();
  const db = getFirestore();

  const queryClient = useQueryClient();

  const adicionarItemCarrinho = useMutation<any, any, ItemCarrinho>({
    mutationFn: async (itemCarrinho: ItemCarrinho) => {
      if (!loggedUser) throw new Error("Usuário não autenticado.");

      const pedidoRef = collection(db, "pedidos");
      const pedidoSnapshot = await getDocs(
        query(
          pedidoRef,
          where("usuario_id", "==", loggedUser.uid),
          where("status", "==", "carrinho")
        )
      );

      const itensRef = collection(db, "itens-pedido");
      const snapshot = await getDocs(
        query(
          itensRef,
          where("usuario_id", "==", loggedUser.uid),
          where("pedido_id", "==", pedidoSnapshot.docs[0].id),
          where("produto_id", "==", itemCarrinho.produto_id)
        )
      );

      if (!snapshot.empty) {
        // item já existe, soma a quantidade
        const existingDoc = snapshot.docs[0];
        await updateDoc(doc(db, "itens-pedido", existingDoc.id), {
          quantidade: existingDoc.data().quantidade + itemCarrinho.quantidade,
        });
        return existingDoc.id;
      } else {
        // item não existe, cria novo
        const orderDoc = await addDoc(itensRef, {
          produto_id: itemCarrinho.produto_id,
          pedido_id: pedidoSnapshot.docs[0].id,
          usuario_id: loggedUser.uid,
          quantidade: itemCarrinho.quantidade,
          valor: itemCarrinho.valor,
          imagem: itemCarrinho.imagem,
          tipo: itemCarrinho.tipo,
          nome: itemCarrinho.nome,
        });
        return orderDoc.id;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carrinho", loggedUser?.uid],
      });
    },
  });

  const alterarQuantidadeItemCarrinho = useMutation({
    mutationFn: async ({
      id,
      quantidade,
    }: {
      id: string;
      quantidade: number;
    }) => {
      if (!loggedUser) throw new Error("Usuário não autenticado.");

      const orderDocRef = doc(db, "itens-pedido", id || "");
      await updateDoc(orderDocRef, {
        quantidade: quantidade,
      });
      return orderDocRef.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carrinho", loggedUser?.uid],
      });
    },
  });

  const removerItemCarrinho = useMutation({
    mutationFn: async (id: string) => {
      if (!loggedUser) throw new Error("Usuário não autenticado.");

      const itemDocRef = doc(db, "itens-pedido", id);
      await deleteDoc(itemDocRef);

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carrinho", loggedUser?.uid],
      });
    },
  });

  const limparCarrinho = useMutation<any, any, Produto[]>({
    mutationFn: async (produtos: Produto[]) => {
      if (!loggedUser) throw new Error("Usuário não autenticado.");

      produtos.forEach(async (itemCarrinho: ItemCarrinho) => {
        const itemDocRef = doc(db, "itens-pedido", itemCarrinho.id || "");
        await deleteDoc(itemDocRef);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carrinho", loggedUser?.uid],
      });
    },
  });

  return {
    adicionarItemCarrinho,
    alterarQuantidadeItemCarrinho,
    removerItemCarrinho,
    limparCarrinho,
  };
}
