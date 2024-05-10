"use client";

import Tag from "@/components/tag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Member } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Member>[] = [
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
    getGroupingValue: ({ yearOfJoinOnRugbyMaua }) => {
      const IS_BIXO = yearOfJoinOnRugbyMaua > new Date().getFullYear() - 1;
      return IS_BIXO ? "BIXO" : "VETERANO";
    },
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
