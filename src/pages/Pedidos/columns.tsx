import { formatCurrency, formatTimeStamp } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

export type Pedido = {
  id: string;
  data: any;
  desconto: number;
  status: string;
  total: number;
  usuario_id: string;
};

export const columns = (
  handleToggleModalPedido: (pedidoId: string) => void
): ColumnDef<Pedido>[] => [
  {
    accessorKey: "acoes",
    header: "Ações",
    cell: ({ row }) => (
      <Eye
        className={
          "cursor-pointer w-5 rounded-xs text-detail-dark/75 hover:scale-115 hover:text-detail-light"
        }
        onClick={() => handleToggleModalPedido(row.original.id)}
      >
        <title>Ver detalhes</title>
      </Eye>
    ),
  },
  {
    accessorKey: "data",
    header: "Data da compra",
    cell: ({ row }) => {
      const data = row.original?.data;
      return formatTimeStamp(data);
    },
  },
  {
    accessorKey: "desconto",
    header: "Desconto",
    cell: ({ row }) => formatCurrency(row.original?.desconto),
  },
  {
    accessorKey: "total",
    header: "Valor Total",
    cell: ({ row }) => formatCurrency(row.original?.total),
  }
];
