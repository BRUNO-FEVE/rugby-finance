"use client";

import { PaymentTag } from "@/components/tags";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Member } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import AddPaymentDrawer from "./add-payment-drawer";
import { getNameInitials } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

export const rugbyPaymentColumns: ColumnDef<Member>[] = [
  {
    accessorKey: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label="Selecinar todos"
          className="translate-y-[2px]"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Selecinar linha"
          className="translate-y-[2px]"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "memberName",
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
      return (
        <div className="flex flex-row gap-2 items-center">
          <Avatar className="w-7 h-7">
            <AvatarImage></AvatarImage>
            <AvatarFallback className="text-xs">
              {getNameInitials(row.original.name)}
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
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      let TOTAL = 0;

      row.original.paymentRecord.map((payment) => {
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
      return <PaymentTag payment={row.original.paymentRecord[0]} />;
    },
  },
  {
    accessorKey: "fev",
    header: "Fev",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.paymentRecord[1]} />;
    },
  },
  {
    accessorKey: "mar",
    header: "Mar",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.paymentRecord[2]} />;
    },
  },
  {
    accessorKey: "abr",
    header: "Abr",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.paymentRecord[3]} />;
    },
  },
  {
    accessorKey: "mai",
    header: "May",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.paymentRecord[4]} />;
    },
  },
  {
    accessorKey: "jun",
    header: "Jun",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.paymentRecord[5]} />;
    },
  },
  {
    accessorKey: "jul",
    header: "Jul",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.paymentRecord[6]} />;
    },
  },
  {
    accessorKey: "ago",
    header: "Ago",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.paymentRecord[7]} />;
    },
  },
  {
    accessorKey: "set",
    header: "Set",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.paymentRecord[8]} />;
    },
  },
  {
    accessorKey: "out",
    header: "Out",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.paymentRecord[9]} />;
    },
  },
  {
    accessorKey: "nov",
    header: "Nov",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.paymentRecord[10]} />;
    },
  },
  {
    accessorKey: "dez",
    header: "Dez",
    cell: ({ row }) => {
      return <PaymentTag payment={row.original.paymentRecord[11]} />;
    },
  },
  {
    accessorKey: "settings",
    header: "",
    cell: ({ row }) => {
      return (
        <>
          <AddPaymentDrawer member={row.original} />
        </>
      );
    },
  },
];

{
  /* <TooltipProvider>
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
        </TooltipProvider> */
}
