import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatCurrency } from "@/lib/utils";
import type { Produto } from "@/types/produto";
import { Search, Trash } from "lucide-react";
import { useState } from "react";

type PagamentoProps = {
  carrinho: Produto[];
};

const Pagamento = ({ carrinho }: PagamentoProps) => {
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

  return (
    <section
      className={cn(
        "bg-light-base/50 rounded-b-md rounded-bl-none flex-1 p-3 gap flex flex-col items-end justify-between"
      )}
    >
      <div className="grid grid-cols-2 gap-2 w-full">
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
              disabled={cupom.desconto > 0}
            />
            {cupom.desconto > 0 ? (
              <Trash
                onClick={() => setCupom({ cupom: "", desconto: 0 })}
                className="absolute right-3 top-1.5 cursor-pointer w-4 text-contrast hover:scale-115"
              />
            ) : (
              <Search
                onClick={() => {
                  if (subtotal > 10)
                    setCupom({ cupom: "DESC10", desconto: 10 });
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

        <div className="flex flex-col justify-between items-end">
          <p className="text-lg">Subtotal: {formatCurrency(subtotal)}</p>
          <p className="text-3xl font-bold">Total: {formatCurrency(total)}</p>
        </div>
      </div>

      <Button className="w-full bg-dark-base text-contrast hover:bg-contrast hover:text-light-base transition-all font-title">
        Finalizar compra
      </Button>
    </section>
  );
};

export default Pagamento;
