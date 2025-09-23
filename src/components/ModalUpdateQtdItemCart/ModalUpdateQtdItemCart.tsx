import { Minus, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { cn, formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { useCarrinho } from "@/hooks/useCarrinho";
import { toastSuccess } from "@/lib/toasts";
import { handleFirebaseError } from "@/lib/firebaseError";
import type { Produto } from "@/types/produto";

const ModalUpdateQtdItemCart = ({
  isOpenModalUpdateQtdItemCart,
  closeModal,
  produto,
}: {
  isOpenModalUpdateQtdItemCart: boolean;
  closeModal: () => void;
  produto: Produto;
}) => {
  const { alterarQuantidadeItemCarrinho } = useCarrinho();
  
  const [quantidade, setQuantidade] = useState<number>(
    produto?.quantidade ?? 1
  );
  useEffect(() => {
    setQuantidade(produto?.quantidade ?? 1);
  }, [produto]);

  const handleUpdateQtdItemCart = (tipo: string) => {
    if (tipo === "add") {
      setQuantidade(quantidade + 1);
    } else {
      if (quantidade <= 1) return;
      setQuantidade(quantidade - 1);
    }
  };

  const updateNewQtdItemCart = async () => {
    if (quantidade <= 0) return;
    try {
      await alterarQuantidadeItemCarrinho.mutateAsync({
        id: produto.id,
        quantidade: quantidade,
      });
      toastSuccess(
        "SUCESSO!",
        `Produto ${produto?.nome} atualizado com sucesso!`,
        "bottom-center"
      );
      closeModal();
    } catch (error) {
      console.log(error);
      handleFirebaseError(error);
    }
  };

  return (
    <Dialog
      open={isOpenModalUpdateQtdItemCart}
      onOpenChange={(open) => !open && closeModal()}
    >
      <DialogContent className="bg-light-base w-fit rounded-lg p-0">
        <DialogTitle className="hidden">Atualizar Quantidade</DialogTitle>
        <DialogHeader
          className={cn(
            "flex flex-row justify-between items-center p-2 text-light-base bg-contrast -m-0.5 rounded-t-md"
          )}
        >
          <span className="text-xs font-semibold">ATUALIZAR QUANTIDADE</span>
          <DialogClose>
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>

        <p className="text-center">{produto?.nome}</p>

        <div className={cn("flex items-center mx-auto")}>
          <Button
            onClick={() => handleUpdateQtdItemCart("remove")}
            variant={"secondary"}
            className={cn("rounded-none rounded-l-md bg-lightest")}
          >
            <Minus />
          </Button>
          <Input
            type="number"
            min={1}
            value={quantidade}
            className={cn("w-18 rounded-none bg-muted text-center")}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          />
          <Button
            onClick={() => handleUpdateQtdItemCart("add")}
            variant={"secondary"}
            className={cn("rounded-none rounded-r-md bg-lightest")}
          >
            <Plus />
          </Button>
        </div>

        <p className="text-center">
          Subtotal: {formatCurrency(quantidade * produto?.valor)}
        </p>

        <div className="flex gap-2 px-2 mb-2">
          <Button onClick={() => closeModal()}>Cancelar</Button>
          <Button
            disabled={quantidade === 0}
            onClick={() => updateNewQtdItemCart()}
            className={cn(
              "bg-dark-base text-contrast hover:bg-contrast hover:text-dark-base"
            )}
          >
            Atualizar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateQtdItemCart;
