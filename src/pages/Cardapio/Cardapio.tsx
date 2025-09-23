import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useProdutos } from "@/hooks/useProdutos";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { useNavigate } from "react-router";
import { Loader, ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { handleFirebaseError } from "@/lib/firebaseError";
import { toastSuccess } from "@/lib/toasts";
import { useCarrinho } from "@/hooks/useCarrinho";

const tabs = [
  { value: "pollo", title: "Pollos" },
  { value: "burger", title: "Hamburgueres" },
  { value: "acompanhamento", title: "Acompanhamentos" },
  { value: "bebida", title: "Bebidas" },
];

interface Produto {
  id: string;
  nome: string;
  valor: number;
  imagem: string;
  descricao: string;
  tipo: string;
}

const Cardapio = () => {
  const loggedUser = useAuth();
  const navigate = useNavigate();

  const { produtos, isLoading } = useProdutos();
  const { adicionarItemCarrinho } = useCarrinho();

  const [dadosTab, setDadosTab] = useState<Produto[] | undefined>([]);

  useEffect(() => {
    const produtosPollos = produtos?.filter(
      (produto) => produto.tipo === "pollo"
    );
    setDadosTab(produtosPollos);
  }, [produtos]);

  const handleSelectTab = (tab: string) => {
    const produtosTab = produtos?.filter((produto) => produto.tipo === tab);
    setDadosTab(produtosTab);
  };

  const handleAdicionarItemCarrinho = async (item: Produto) => {
    try {
      await adicionarItemCarrinho.mutateAsync({
        produto_id: item!.id,
        quantidade: 1,
        valor: item!.valor,
        imagem: item!.imagem,
        tipo: item!.tipo,
        nome: item!.nome,
      });
      toastSuccess(
        "SUCESSO!",
        `1x ${item?.nome} adicionado ao carrinho!`,
        "top-right"
      );
    } catch (error) {
      console.log(error);
      handleFirebaseError(error);
    }
  };

  return (
    <section className={cn("h-full w-full flex flex-col gap-3")}>
      <SectionTitle title="CARDÁPIO" />
      <Tabs defaultValue="pollo" className="flex flex-col flex-1 min-h-0">
        <TabsList
          className={cn(
            "flex justify-start overflow-x-auto w-full rounded-none space-x-2 bg-transparent p-0"
          )}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "bg-dark-base text-contrast p-2 rounded-none data-[state=active]:bg-contrast data-[state=active]:text-lightest text-base"
              )}
              onClick={() => handleSelectTab(tab.value)}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className={cn("flex-1 min-h-0 overflow-auto scrollbar-custom")}
          >
            {isLoading ? (
              <div className="w-full h-full grid grid-cols-1 tablet:grid-cols-2 gap-3">
                {[...Array(4)].map((i) => (
                  <div
                    key={i}
                    className="w-full h-full bg-darkest/15 rounded-md"
                  />
                ))}
              </div>
            ) : (
              dadosTab && (
                <div
                  className={cn("grid grid-cols-1 tablet:grid-cols-2 gap-3")}
                >
                  {dadosTab.map((item: Produto) => (
                    <div
                      key={item.id}
                      className={cn("flex flex-col relative cursor-pointer")}
                      onClick={() => navigate(`/cardapio/produto/${item.id}`)}
                    >
                      {loggedUser && (
                        <div
                          className={cn(
                            "absolute top-0 right-0 p-2 text-light-base bg-contrast hover:bg-dark-base hover:text-contrast transition-all duration-200 rounded-tr-md rounded-bl-md"
                          )}
                        >
                          {adicionarItemCarrinho.isPending &&
                          adicionarItemCarrinho.variables?.produto_id ===
                            item.id ? (
                            <Loader className="w-5" />
                          ) : (
                            <ShoppingCart
                              className="w-5"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAdicionarItemCarrinho(item);
                              }}
                            >
                              <title>Adicionar ao carrinho</title>
                            </ShoppingCart>
                          )}
                        </div>
                      )}
                      <img
                        src={item.imagem}
                        className={cn(
                          "w-full rounded-t-md p-0 bg-light-base h-40 object-cover"
                        )}
                        alt={item.nome}
                      />
                      <div
                        className={cn(
                          "flex justify-between items-center w-full bg-light-base rounded-b-md px-4 py-2"
                        )}
                      >
                        <p
                          className={cn(
                            "font-bold text-lg tablet:text-xl font-title"
                          )}
                        >
                          {item.nome}
                        </p>
                        <p
                          className={cn(
                            "text-2xl tablet:text-3xl font-title text-contrast"
                          )}
                        >
                          <span className="text-base">R$ </span>
                          {item.valor}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default Cardapio;
