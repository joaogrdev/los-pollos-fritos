import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
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

  return (
    <Dialog open={stateModal} onOpenChange={(open) => !open && toggleModal()}>
      <DialogContent className="bg-light-base rounded-lg p-0">
        <DialogTitle className="hidden">Detalhes do pedido</DialogTitle>
        <DialogHeader
          className={cn(
            "flex flex-row justify-between items-center p-2 text-light-base bg-contrast -m-0.5 rounded-t-md"
          )}
        >
          <span className="font-semibold">Detalhes do pedido</span>
          <DialogClose>
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        {isLoading && <LoadingSpinner position="start" />}
        {error && <p>Erro ao carregar detalhes do pedido.</p>}
        {isSuccess && pedido && (
          <>
            <div className="px-5">
              <p>Código do pedido: {pedido?.id}</p>
              <p>Envio: Av. Fulano de Tal</p>
              <p className="font-semibold text-lg">
                Valor total: {pedido?.total}
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
