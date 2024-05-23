"use client";

import { getMemberById } from "@/actions/get-member-by-id";
import { Tag } from "@/components/tags";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Payment } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Calendar, ClipboardEditIcon } from "lucide-react";

export const paymentsColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="pl-5">
          <Button
            variant={"ghost"}
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            Nome <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      );
    },
    cell: async ({ row }) => {
      return <p>{row.original.memberName}</p>;
    },
  },
  {
    accessorKey: "value",
    header: ({}) => <p className="text-center">Valor</p>,
    cell: ({ row }) => {
      return <p className="text-center">R$: {row.original.value.toString()}</p>;
    },
  },
  {
    accessorKey: "type",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-3">
          <Tag label={row.original.type?.toUpperCase() ?? ""} />
          <Tag label={row.original.cause.toUpperCase()} />
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({}) => <p className="text-center">Data de Pagamento</p>,
    cell: ({ row }) => {
      return (
        <div className="w-full flex gap-2 items-center justify-center">
          <Calendar className="w-4 h-4" />
          <p>{formatDate(row.original.date)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "update",
    header: "",
    cell: ({}) => {
      return (
        <Button
          variant={"ghost"}
          className="text-muted-foreground hover:text-primary"
        >
          <ClipboardEditIcon className="w-4 h-4 " />
        </Button>
      );
    },
  },
];
