"use client";

import { Tag } from "@/components/tags";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatPhoneNumber } from "@/lib/utils";
import { Member } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { UpdatePaymentStatusDialog } from "./update-payment-status-dialog";
import MemberInfoDialog from "./member-info-dialog";

export const membersColumns: ColumnDef<Member>[] = [
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
    cell: ({ row }) => {
      const splitedName = row.original.name.split(" ");

      return (
        <div className="flex flex-row gap-2 items-center">
          <Avatar className="w-7 h-7">
            <AvatarImage></AvatarImage>
            <AvatarFallback className="text-xs">
              {splitedName[0].charAt(0)}
              {splitedName[splitedName.length - 1].charAt(0)}
            </AvatarFallback>
          </Avatar>
          <p>
            {row.original.name}{" "}
            <span className="text-muted-foreground">
              ({row.original.nickname})
            </span>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "isPaying",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="w-full flex justify-center">
          <UpdatePaymentStatusDialog member={row.original} />
        </div>
      );
    },
  },
  {
    accessorKey: "yearOfJoinOnRugbyMaua",
    header: "",
    getGroupingValue: ({ yearOfJoinOnRugbyMaua }) => {
      const IS_BIXO = yearOfJoinOnRugbyMaua > new Date().getFullYear() - 1;
      return IS_BIXO ? "BIXO" : "VETERANO";
    },
    cell: ({ row }) => {
      const IS_BIXO =
        row.original.yearOfJoinOnRugbyMaua > new Date().getFullYear() - 1;

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
    header: ({ column }) => {
      return <Button variant={"ghost"}>Email</Button>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell: ({ row }) => {
      return <p>{formatPhoneNumber(row.original.phoneNumber)}</p>;
    },
  },
  {
    accessorKey: "more-info",
    header: "",
    cell: ({ row }) => {
      return <MemberInfoDialog member={row.original} />;
    },
  },
];
