import { formatCurrency } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { Pen, XSquare } from "lucide-react";
import type { Produto } from "@/types/produto";

export const columns = (
  openZoomInImageModal: (imagem: string, nome: string) => void,
  handleRemoveItemCart: (id: string) => void,
  handleUpdateQtdItemCart: (produto: Produto) => void
): ColumnDef<Produto>[] => [
  {
    id: "acoes",
    header: "Ações",
    cell: ({ row }) => (
      <XSquare
        className={
          "cursor-pointer h-5 w-5 rounded-xs text-contrast hover:bg-contrast hover:text-light-base"
        }
        onClick={() => handleRemoveItemCart(row.original?.id)}
      >
        <title>Remover</title>
      </XSquare>
    ),
  },
  {
    accessorKey: "imagem",
    header: "Imagem",
    cell: ({ row }) => (
      <img
        src={row.original?.imagem}
        alt={row.original?.nome}
        className={"w-12 h-6 object-cover cursor-zoom-in"}
        onClick={() =>
          openZoomInImageModal(row.original?.imagem, row.original?.nome)
        }
      />
    ),
  },
  {
    accessorKey: "nome",
    header: "Produto",
  },
  {
    accessorKey: "valor",
    header: "Valor Unitário",
    cell: ({ row }) => formatCurrency(row.original?.valor),
  },
  {
    accessorKey: "quantidade",
    header: "Quantidade",
    cell: ({ row }) => {
      return (
        <div className="flex items-center bg-muted/50 w-fit rounded-md">
          <p className="text-base px-4">{row.original?.quantidade}</p>
          <div
            className="flex items-center w-fit h-full bg-lightest/75 rounded-r-md px-2 text-contrast hover:bg-contrast hover:text-light-base cursor-pointer"
            onClick={() => handleUpdateQtdItemCart(row.original)}
          >
            <Pen className={"w-3"}>
              <title>Remover</title>
            </Pen>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Subtotal",
    cell: ({ row }) => formatCurrency(row.original?.valor * row.original?.quantidade),
  },
];
