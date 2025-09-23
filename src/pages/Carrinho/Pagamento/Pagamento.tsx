import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCriarPedido } from "@/hooks/useCriarPedido";
import { useFinalizarPedido } from "@/hooks/useFinalizarPedido";
import { handleFirebaseError } from "@/lib/firebaseError";
import { toastSuccess } from "@/lib/toasts";
import { cn, formatCurrency } from "@/lib/utils";
import type { Produto } from "@/types/produto";
import { Search, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

type PagamentoProps = {
  carrinho: Produto[];
};

const Pagamento = ({ carrinho }: PagamentoProps) => {
  const { finalizarPedido } = useFinalizarPedido();
  const criarPedido = useCriarPedido();
  const navigate = useNavigate();

  const [cupom, setCupom] = useState({
    cupom: "",
    desconto: 0,
  });

  const subtotal = carrinho.reduce(
    (acc, item) => acc + item.valor * item.quantidade,
    0
  );
  const total: number =
    subtotal < cupom.desconto ? subtotal : subtotal - cupom.desconto;

  const handleFinalizarPedido = async () => {
    try {
      await finalizarPedido.mutateAsync({
        desconto: cupom.desconto,
        total: total,
        status: "pedido",
        data: new Date().toISOString(),
      });
      await criarPedido.mutateAsync({});
      toastSuccess("SUCESSO!", "Pedido realizado com sucesso!", "bottom-right");

      navigate("/pedidos");
    } catch (error) {
      console.log(error);
      handleFirebaseError(error);
    }
  };

  return (
    <section
      className={cn(
        "bg-light-base/50 rounded-b-md rounded-bl-none flex-1 p-3 gap flex flex-col items-end justify-between"
      )}
    >
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-2 w-full">
        <fieldset className="flex flex-col ">
          <p className="text-sm">Cupom</p>
          <div className="relative">
            <Input
              type="text"
              value={cupom.cupom}
              onChange={(e) =>
                setCupom({
                  cupom: e.target.value,
                  desconto: 0,
                })
              }
              disabled={cupom.desconto > 0 || subtotal === 0}
            />
            {cupom.desconto > 0 ? (
              <Trash
                onClick={() => setCupom({ cupom: "", desconto: 0 })}
                className="absolute right-3 top-1.5 cursor-pointer w-4 text-contrast hover:scale-115"
              />
            ) : (
              <Search
                onClick={() => {
                  if (subtotal > 10 && cupom.cupom)
                    setCupom({
                      cupom: cupom.cupom,
                      desconto: Math.floor(Math.random() * 10),
                    });
                }}
                className="absolute right-3 top-1.5 cursor-pointer w-4 text-detail-dark hover:scale-115"
              />
            )}
          </div>
          {cupom.desconto > 0 && (
            <p className="text-sm text-contrast">
              Desconto: R$ {cupom.desconto}
            </p>
          )}
        </fieldset>

        <div className="flex flex-col justify-between items-end mb-2">
          <p className="text-lg">Subtotal: {formatCurrency(subtotal)}</p>
          <p className="text-2xl font-bold">Total: {formatCurrency(total)}</p>
        </div>
      </div>

      <Button
        className="w-full bg-dark-base text-contrast hover:bg-contrast hover:text-light-base transition-all font-title"
        disabled={subtotal === 0}
        onClick={handleFinalizarPedido}
      >
        Finalizar compra
      </Button>
    </section>
  );
};

export default Pagamento;
