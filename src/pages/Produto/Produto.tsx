import { ArrowLeftCircle, Minus, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProduto } from "@/hooks/useProduto";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useCarrinho } from "@/hooks/useCarrinho";
import { toastSuccess } from "@/lib/toasts";
import { handleFirebaseError } from "@/lib/firebaseError";

const Produto = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { produto, isLoading } = useProduto({ id: id! });
  const { adicionarItemCarrinho } = useCarrinho();

  const [quantidade, setQuantidade] = useState(1);

  const handleQuantidadeProduto = (tipo: string) => {
    if (tipo === "add") {
      setQuantidade(quantidade + 1);
    } else {
      if (quantidade <= 1) return;
      setQuantidade(quantidade - 1);
    }
  };

  const calculatePrice = (price: number) => {
    if (isNaN(quantidade)) return price.toFixed(2).replace(".", ",");
    return (price * quantidade).toFixed(2).replace(".", ",");
  };

  const handleAdicionarItemCarrinho = async (tipo: string) => {
    try {
      await adicionarItemCarrinho.mutateAsync({
        produto_id: produto!.id,
        quantidade: quantidade,
        valor: produto!.valor,
        imagem: produto!.imagem,
        tipo: produto!.tipo,
        nome: produto!.nome,
      });
      tipo === "adicionar"
        ? toastSuccess(
            "SUCESSO!",
            `Produto ${produto?.nome} adicionado ao carrinho com sucesso!`,
            "top-right"
          )
        : navigate("/carrinho");
    } catch (error) {
      console.log(error);
      handleFirebaseError(error);
    }
  };

  return (
    <section className={cn("h-full w-full flex flex-col gap-3")}>
      {isLoading ? (
        <div className="w-full h-full grid grid-rows-[1fr_10fr] gap-3">
          {[...Array(2)].map((i) => (
            <div key={i} className="w-full h-full bg-darkest/15 rounded-md" />
          ))}
        </div>
      ) : (
        <div className={cn("flex flex-col gap-1 h-full pb-20")}>
          <h1
            className={cn(
              "text-base font-semibold font-title text-darkest mb-2 rounded-md flex items-center gap-2 w-full bg-light-base p-2"
            )}
          >
            <ArrowLeftCircle
              size={20}
              className={cn(
                "cursor-pointer text-contrast rounded-full hover:scale-115"
              )}
              onClick={() => navigate(-1)}
            >
              <title>Voltar</title>
            </ArrowLeftCircle>
            {`Cardápio / ${produto?.tipo
              .charAt(0)
              .toUpperCase()}${produto?.tipo.slice(1)} / ${produto?.nome}`}
          </h1>
          <div className="grid grid-cols-1 laptop:grid-cols-2 flex-1 h-full">
            <div className="w-full h-40 laptop:h-125 desktop:h-130">
              <img
                src={produto?.imagem || ""}
                alt={produto?.nome || ""}
                className="w-full h-full object-cover rounded-t-xl laptop:rounded-none laptop:rounded-l-xl "
              />
            </div>
            <div
              className={cn(
                "flex flex-col bg-light-base/50 rounded-b-xl laptop:rounded-none laptop:rounded-r-xl p-5 tablet:p-10 h-full laptop:h-125 desktop:h-130"
              )}
            >
              <h2
                className={cn(
                  "text-3xl laptop:text-5xl font-semibold font-title"
                )}
              >
                {produto?.nome}
              </h2>
              <p
                className={cn(
                  "font-bold text-3xl laptop:text-5xl text-contrast mt-5 mb-8 font-title"
                )}
              >
                <span className={cn("text-xl")}>R$ </span>
                {calculatePrice(produto?.valor || 0)}
              </p>

              {/*CONTAINER DE QUANTIDADE*/}
              <div className={cn("flex items-center mb-5")}>
                <Button
                  onClick={() => handleQuantidadeProduto("remove")}
                  variant={"secondary"}
                  className={cn("rounded-none rounded-l-md")}
                >
                  <Minus />
                </Button>
                <Input
                  type="number"
                  min={1}
                  value={quantidade}
                  onChange={(e) => setQuantidade(parseInt(e.target.value))}
                  className={cn("w-18 rounded-none bg-light-base text-center")}
                />
                <Button
                  onClick={() => handleQuantidadeProduto("add")}
                  variant={"secondary"}
                  className={cn("rounded-none rounded-r-md")}
                >
                  <Plus />
                </Button>
              </div>

              {/*CONTAINER DE BOTOES*/}
              <div className={cn("flex flex-col gap-3 mb-10")}>
                <Button
                  variant={"secondary"}
                  className={cn(
                    "bg-dark-base text-contrast hover:bg-light-base hover:text-contrast transition-all"
                  )}
                  onClick={() => handleAdicionarItemCarrinho("adicionar")}
                >
                  Adicionar ao carrinho
                </Button>
                <Button
                  variant={"secondary"}
                  className={cn(
                    "bg-contrast text-light-base hover:text-contrast"
                  )}
                  onClick={() => handleAdicionarItemCarrinho("comprar")}
                >
                  Comprar agora
                </Button>
              </div>

              {/*DESCRICAO DO PRODUTO*/}
              <div className={cn("font-subtitle overflow-auto")}>
                <h4
                  className={cn(
                    "font-semibold border-b border-detail-dark/50 mb-1"
                  )}
                >
                  Descrição
                </h4>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Molestias eaque officiis enim et natus tempore rem, est sint
                  illo illum doloribus modi nisi repellat velit pariatur cumque
                  odio omnis accusantium.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Produto;
