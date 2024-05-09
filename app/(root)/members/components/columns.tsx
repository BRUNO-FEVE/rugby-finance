"use client";

import Tag from "@/components/tag";
import { Member } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "yearOfJoinOnRugbyMaua",
    header: () => (
      <div className="text-center">
        <p>Hierarquia</p>
      </div>
    ),
    cell: ({ row }) => {
      const IS_BIXO =
        row.original.yearOfJoinOnRugbyMaua < new Date().getFullYear() - 1;
      return (
        <div className="w-full flex justify-center">
          <Tag label={IS_BIXO ? "BIXO" : "VETERANO"} />
        </div>
      );
    },
  },
  {
    accessorKey: "team",
    header: "Time",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Telefone",
  },
];
