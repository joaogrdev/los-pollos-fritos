import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

type Produto = {
  id: string;
  nome: string;
  valor: number;
  imagem: string;
  descricao: string;
  tipo: string;
};

export function useProdutos() {
  const {
    data: produtos,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["produtos"],
    queryFn: async (): Promise<Produto[]> => {
      const querySnapshot = await getDocs(collection(db, "produtos"));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Produto[];
    },
    staleTime: Infinity,
  });

  return {
    produtos,
    isLoading,
    isSuccess,
    error,
  };
}
