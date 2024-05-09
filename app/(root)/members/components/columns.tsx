"use client";

import Tag from "@/components/tag";
import { Button } from "@/components/ui/button";
import { Member } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Nome <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const IS_BIXO =
        row.original.yearOfJoinOnRugbyMaua > new Date().getFullYear() - 1;

      return (
        <div className="flex flex-row gap-2 items-center">
          <p>
            {row.original.name}{" "}
            <span className="text-muted-foreground">
              ({row.original.nickName})
            </span>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "yearOfJoinOnRugbyMaua",
    header: "",
    cell: ({ row }) => {
      const IS_BIXO =
        row.original.yearOfJoinOnRugbyMaua > new Date().getFullYear() - 1;
      return <Tag label={IS_BIXO ? "BIXO" : "VETERANO"} />;
    },
  },
  {
    accessorKey: "team",
    header: "Time",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <Button variant={"ghost"}>Email</Button>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell: ({ row }) => {
      const PHONE_STRING = row.original.phoneNumber.toString();

      return (
        <p>
          ({PHONE_STRING.slice(0, 2)}) {PHONE_STRING.slice(2, 7)}-
          {PHONE_STRING.slice(7)}
        </p>
      );
    },
  },
];
