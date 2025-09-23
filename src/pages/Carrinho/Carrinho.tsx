import { cn } from "@/lib/utils";
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { DataTable } from "./datatable";

import { columns } from "./columns";
import ModalZoomInImage from "@/components/ModalZoomInImage/ModalZoomInImage";
import ModalUpdateQtdItemCart from "@/components/ModalUpdateQtdItemCart/ModalUpdateQtdItemCart";
import Entrega from "./Entrega/Entrega";
import Pagamento from "./Pagamento/Pagamento";
import { useGetCarrinho } from "@/hooks/useGetCarrinho";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import type { Produto } from "@/types/produto";
import { useCarrinho } from "@/hooks/useCarrinho";
import { toastSuccess } from "@/lib/toasts";
import { handleFirebaseError } from "@/lib/firebaseError";
import { Button } from "@/components/ui/button";
import ErroMsgTabelas from "@/components/ErroMsgTabelas/ErroMsgTabelas";

const Cardapio = () => {
  const { carrinho, isLoading, isSuccess, error } = useGetCarrinho();
  const { removerItemCarrinho, limparCarrinho } = useCarrinho();

  const [zoomInImage, setZoomInImage] = useState<string>("");
  const [isOpenModalUpdateQtdItemCart, setIsOpenModalUpdateQtdItemCart] =
    useState(false);
  const [produtoUpdateQtd, setProdutoUpdateQtd] = useState<Produto>(
    {} as Produto
  );

  const openZoomInImageModal = (imagem: string) => setZoomInImage(imagem);
  const closeModal = () => {
    setZoomInImage("");
    setIsOpenModalUpdateQtdItemCart(false);
  };

  const handleRemoveItemCart = async (id: string) => {
    try {
      await removerItemCarrinho.mutateAsync(id);
      toastSuccess(
        "SUCESSO!",
        "Item removido do carrinho com sucesso!",
        "top-right"
      );
    } catch (error) {
      console.log(error);
      handleFirebaseError(error);
    }
  };

  const handleUpdateQtdItemCart = (produto: Produto) => {
    setProdutoUpdateQtd(produto);
    setIsOpenModalUpdateQtdItemCart(true);
  };

  const handleLimparCarrinho = async () => {
    try {
      await limparCarrinho.mutateAsync(carrinho as any);
      toastSuccess("SUCESSO!", "Carrinho limpo com sucesso!", "bottom-right");
    } catch (error) {
      console.log(error);
      handleFirebaseError(error);
    }
  };

  return (
    <section className={cn("h-full w-full flex flex-col gap-3 relative")}>
      <div className="relative">
        <SectionTitle title="CARRINHO" />
        <Button
          disabled={limparCarrinho.isPending || !carrinho?.length}
          onClick={() => handleLimparCarrinho()}
          className="absolute top-1/2 -translate-y-1/2 right-2 flex items-center w-fit border border-contrast bg-light-base text-contrast hover:bg-contrast hover:text-light-base"
        >
          {limparCarrinho.isPending ? "Limpando..." : "Limpar carrinho"}
        </Button>
      </div>
      <ModalZoomInImage zoomInImage={zoomInImage} closeModal={closeModal} />
      <ModalUpdateQtdItemCart
        isOpenModalUpdateQtdItemCart={isOpenModalUpdateQtdItemCart}
        closeModal={closeModal}
        produto={produtoUpdateQtd}
      />
      <div className="w-full h-full flex flex-col gap-2">
        <div>
          {isLoading ? (
            <LoadingSpinner />
          ) : isSuccess && carrinho?.length ? (
            <DataTable
              data={carrinho}
              columns={columns(
                openZoomInImageModal,
                handleRemoveItemCart,
                handleUpdateQtdItemCart
              )}
            />
          ) : isSuccess && carrinho?.length === 0 ? (
            <ErroMsgTabelas msg="Nenhum item no carrinho." />
          ) : (
            error && <ErroMsgTabelas msg="Erro ao carregar carrinho." />
          )}
        </div>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 min-h-43">
          <Entrega />
          <div className="h-full flex flex-col">
            <p className="text-xs bg-light-base p-1 font-title font-semibold text-center">
              Pagamento somente na Entrega/Retirada!
            </p>
            <Pagamento carrinho={carrinho || []} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cardapio;
