"use client";

import { PaymentTag } from "@/components/tags";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RugbyPayment } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ClipboardEditIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export const rugbyPaymentColumns: ColumnDef<RugbyPayment>[] = [
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
      const splitedName = row.original.memberName.split(" ");

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
            {row.original.memberName}{" "}
            <span className="text-muted-foreground">
              ({row.original.memberNickName})
            </span>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      let TOTAL = 0;

      row.original.monthsPayment.map((payment) => {
        TOTAL += payment;
      });

      return (
        <div className="w-full flex justify-center">
          <p>R$: {TOTAL}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "jan",
    header: "Jan",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.monthsPayment[0]} />;
    },
  },
  {
    accessorKey: "fev",
    header: "Fev",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.monthsPayment[1]} />;
    },
  },
  {
    accessorKey: "mar",
    header: "Mar",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.monthsPayment[2]} />;
    },
  },
  {
    accessorKey: "abr",
    header: "Abr",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.monthsPayment[3]} />;
    },
  },
  {
    accessorKey: "mai",
    header: "May",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.monthsPayment[4]} />;
    },
  },
  {
    accessorKey: "jun",
    header: "Jun",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.monthsPayment[5]} />;
    },
  },
  {
    accessorKey: "jul",
    header: "Jul",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.monthsPayment[6]} />;
    },
  },
  {
    accessorKey: "ago",
    header: "Ago",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.monthsPayment[7]} />;
    },
  },
  {
    accessorKey: "set",
    header: "Set",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.monthsPayment[8]} />;
    },
  },
  {
    accessorKey: "out",
    header: "Out",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.monthsPayment[9]} />;
    },
  },
  {
    accessorKey: "nov",
    header: "Nov",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.monthsPayment[10]} />;
    },
  },
  {
    accessorKey: "dez",
    header: "Dez",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.monthsPayment[11]} />;
    },
  },
  {
    accessorKey: "settings",
    header: "",
    cell: () => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                className="text-muted-foreground hover:text-primary"
              >
                <ClipboardEditIcon className="w-4 h-4 " />
              </Button>
            </TooltipTrigger>
            <TooltipContent alignOffset={5} side="bottom">
              <p className="text-xs">Adicione Pagemento</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
