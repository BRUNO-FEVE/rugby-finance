"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { UserPlus, Users } from "lucide-react";
import Link from "next/link";
import AproveMemberPopover from "./aprove-member-popover";

interface TableToolbarProps<TData> {
  table: Table<TData>;
}

export default function TableToolbar<TData>({
  table,
}: TableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex justify-between">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Pesquisar membro..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
          className="max-w-sm h-9"
        />
        {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex items-center gap-2 font-normal border border-dashed rounded-md border-input hover:border-muted-foreground"
            size={"sm"}
            variant={"ghost"}
          >
            <PlusCircleIcon strokeWidth={2} className="w-4 h-4" />
            Hierarquia
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-sm">
          <DropdownMenuItem
            onClick={() => {
              table..getColumn("yearOfJoinOnRugbyMaua")?.;
            }}
          >
            BIXO
          </DropdownMenuItem>
          <DropdownMenuItem>VETERANO</DropdownMenuItem>

          {isFiltered ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  table.resetColumnFilters();
                }}
              >
                Limpar Filtro
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu> */}
      </div>
      <div className="flex items-center py-4 gap-4">
        <AproveMemberPopover />
        <Link
          href={"member"}
          className={
            buttonVariants({ variant: "default" }) + " flex flex-row gap-2"
          }
        >
          <UserPlus className="w-5 h-5" /> Adicinar Novo Membro
          <p>{}</p>
        </Link>
      </div>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size={"sm"}
            variant={"outline"}
            className="flex items-center gap-2"
          >
            <Settings2 className="w-4 h-4" />
            Ajustes
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="text-sm">
          <DropdownMenuItem className="flex gap-2">
            <p>Tamanho da Lista: </p>
            <Input
              className="w-20 h-7"
              onChange={(event) => {
                table.setPageSize(+event.target.value);
              }}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
}
