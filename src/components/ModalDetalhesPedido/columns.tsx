import { formatCurrency } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";

export type ItemPedido = {
  id: string;
  nome: string;
  quantidade: number;
  valor: number;
  pedido_id: string;
  tipo: string;
  imagem: string;
};

export const columns = (): ColumnDef<ItemPedido>[] => [
  {
    accessorKey: "imagem",
    header: "Imagem",
  },
  {
    accessorKey: "nome",
    header: "Produto",
  },
  {
    accessorKey: "quantidade",
    header: "Quantidade",
  },
  {
    accessorKey: "valor",
    header: "Valor Unitário",
    cell: ({ row }) => formatCurrency(row.original?.valor),
  },
  {
    accessorKey: "total",
    header: "Subtotal",
    cell: ({ row }) => formatCurrency(row.original?.quantidade * row.original?.valor),
  },
];
