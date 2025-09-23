import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

type Produto = {
  id: string;
  nome: string;
  valor: number;
  imagem: string;
  descricao: string;
  tipo: string;
};

export function useProduto({ id }: { id: string }) {
  const {
    data: produto,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["produto", id],
    queryFn: async (): Promise<Produto | null> => {
      const snapshot = await getDoc(doc(db, "produtos", id));
      if (!snapshot.exists()) return null;

      return {
        id: snapshot.id,
        ...snapshot.data(),
      } as Produto;
    },
    enabled: !!id,
    staleTime: Infinity,
  });

  return {
    produto,
    isLoading,
    isSuccess,
    error,
  };
}
