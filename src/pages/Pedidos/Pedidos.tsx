import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DataTable } from "./datatable";
import { columns } from "./columns";
import ModalDetalhesPedido from "@/components/ModalDetalhesPedido/ModalDetalhesPedido";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { usePedidos } from "@/hooks/usePedidos";

const Pedidos = () => {
  const { pedidos, isLoading, isSuccess } = usePedidos();
  const [isOpenModalDetalhesPedido, setIsOpenModalDetalhesPedido] = useState({
    isOpen: false,
    pedidoId: null,
  });

  const handleToggleModalPedido = (pedidoId?: any) => {
    pedidoId
      ? setIsOpenModalDetalhesPedido({ isOpen: true, pedidoId })
      : setIsOpenModalDetalhesPedido({ isOpen: false, pedidoId: null });
  };

  return (
    <section className={cn("h-full w-full flex flex-col gap-3 relative")}>
      <SectionTitle title="PEDIDOS" />
      <ModalDetalhesPedido
        stateModal={isOpenModalDetalhesPedido.isOpen}
        toggleModal={handleToggleModalPedido}
        pedidoId={isOpenModalDetalhesPedido.pedidoId || ""}
      />
      {isLoading ? (
        <LoadingSpinner position="start" />
      ) : isSuccess && pedidos?.length ? (
        <DataTable
          data={pedidos || []}
          columns={columns(handleToggleModalPedido)}
        />
      ) : isSuccess && pedidos?.length === 0 ? (
        <p className="text-lg font-semibold">Nenhum pedido encontrado</p>
      ) : null}
    </section>
  );
};

export default Pedidos;
