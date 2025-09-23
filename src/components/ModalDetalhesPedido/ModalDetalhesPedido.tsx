import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { cn, formatCurrency, formatTimeStamp } from "@/lib/utils";
import { X } from "lucide-react";
import { DataTable } from "./datatable";
import { columns } from "./columns";
import { usePedido } from "@/hooks/usePedido";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ModalDetalhesPedido = ({
  stateModal,
  toggleModal,
  pedidoId,
}: {
  stateModal: boolean;
  toggleModal: (pedido?: any) => void;
  pedidoId: string;
}) => {
  const { pedido, isLoading, isSuccess, error } = usePedido(pedidoId);
  console.log(error?.message);

  return (
    <Dialog open={stateModal} onOpenChange={(open) => !open && toggleModal()}>
      <DialogContent className="bg-light-base rounded-lg p-0">
        <DialogTitle className="hidden">Detalhes do pedido</DialogTitle>
        <DialogHeader
          className={cn(
            "flex flex-row justify-between items-center p-2 text-light-base bg-contrast -m-0.5 rounded-t-md"
          )}
        >
          <span className="font-semibold">
            DETALHES DO PEDIDO - Cód: {pedido?.id}
          </span>
          <DialogClose>
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        {isLoading && <LoadingSpinner position="start" />}
        {error && <p>Erro ao carregar detalhes do pedido.</p>}
        {isSuccess && pedido && (
          <>
            <div className="px-5">
              <p>Data do pedido: {formatTimeStamp(pedido?.data)}</p>
              <p>Envio: {pedido?.endereco}</p>
              <p>Desconto: {formatCurrency(pedido?.desconto)}</p>
              <p className="font-semibold text-xl">
                Valor total: {formatCurrency(pedido?.total)}
              </p>
            </div>
            <div className="p-5 bg-dark-base/50 overflow-auto">
              <DataTable columns={columns()} data={pedido?.itens || []} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetalhesPedido;
